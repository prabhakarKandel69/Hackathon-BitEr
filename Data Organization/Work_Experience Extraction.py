import os
import spacy

# Load the large English language model
nlp = spacy.load("en_core_web_lg")

def extract_work_experience(text):
    """
    Extract the Work Experience section from the given text.
    :param text: The full text of the CV.
    :return: Extracted Work Experience section as a string.
    """
    # Define keywords typically associated with work experience sections
    experience_keywords = [
        "experience", "work experience", "employment history", "professional experience",
        "career summary", "work history", "job responsibilities", "positions held"
    ]

    lines = text.split("\n")
    work_experience = []
    capture = False  # Boolean flag to capture lines related to work experience

    for line in lines:
        normalized_line = line.lower().strip()
        if any(keyword in normalized_line for keyword in experience_keywords):
            capture = True
            work_experience.append(line)  # Add the keyword line itself
            continue
        if capture:
            if line.strip():
                work_experience.append(line)
            else:
                break

    return "\n".join(work_experience) if work_experience else "No work experience section found."

def read_text_from_file(file_path):
    """
    Read the content of a file.
    :param file_path: Path to the file.
    :return: The content of the file as a string.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def write_text_to_file(file_path, content):
    """
    Write content to a file.
    :param file_path: Path to the output file.
    :param content: The content to write.
    """
    try:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Extracted content written to {file_path}")
    except Exception as e:
        print(f"Error writing to file {file_path}: {e}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_directory = os.path.join(script_dir, "..", "Extracted File")
    output_directory = os.path.join(script_dir, "..", "Extracted File 2")

    # Ensure the output directory exists
    if not os.path.exists(output_directory):
        print(f"Output directory {output_directory} does not exist. Creating it...")
        os.makedirs(output_directory)

    # Look for text files in the input directory
    files = [f for f in os.listdir(input_directory) if f.endswith(".txt")]
    if not files:
        print(f"No text files found in {input_directory}. Exiting...")
        exit()

    for file_name in files:
        input_file_path = os.path.join(input_directory, file_name)
        output_file_path = os.path.join(output_directory, f"Experience_{file_name}")

        cv_text = read_text_from_file(input_file_path)

        if cv_text:
            # Extract the work experience section
            work_experience_section = extract_work_experience(cv_text)

            # Write the extracted content to the output file
            write_text_to_file(output_file_path, work_experience_section)

            print(f"Processed {file_name}. Extracted content saved to {output_file_path}")
