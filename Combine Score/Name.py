import os
from transformers import pipeline

# Load a pre-trained NER pipeline
def load_ner_model():
    return pipeline("ner", grouped_entities=True, model="dbmdz/bert-large-cased-finetuned-conll03-english")

def extract_name_ner(text, ner_model):
    """
    Extracts names from the text using a pre-trained Hugging Face NER model.
    Returns the first 'PER' (Person) entity detected.
    """
    entities = ner_model(text)
    for entity in entities:
        if entity['entity_group'] == 'PER':  # 'PER' stands for PERSON
            return entity['word']
    return "No name found."

def read_text_from_file(file_path):
    """
    Reads text content from the given file path.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def write_text_to_file(file_path, content):
    """
    Writes text content to the given file path.
    """
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Extracted name written to {file_path}")
    except Exception as e:
        print(f"Error writing to file {file_path}: {e}")

if __name__ == "__main__":
    # Define directories
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_directory = os.path.join(script_dir, "..", "Extracted File")
    output_directory = os.path.join(script_dir, "..", "Extracted File 2")

    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        print(f"Output directory {output_directory} does not exist. Creating it...")
        os.makedirs(output_directory)

    # Locate text files in the input directory
    files = [f for f in os.listdir(input_directory) if f.endswith(".txt")]
    if not files:
        print(f"No text files found in {input_directory}. Exiting...")
        exit()

    # Load the pre-trained NER model
    ner_model = load_ner_model()

    for file_name in files:
        input_file_path = os.path.join(input_directory, file_name)
        output_file_path = os.path.join(output_directory, "Name.txt")  # Save extracted name to "Name.txt"

        # Read the text content of the file
        cv_text = read_text_from_file(input_file_path)

        if cv_text:
            # Extract the name using the NER model
            extracted_name = extract_name_ner(cv_text, ner_model)

            # Write the name to the output file
            write_text_to_file(output_file_path, extracted_name)

            print(f"Processed {file_name}. Extracted name saved to {output_file_path}")
