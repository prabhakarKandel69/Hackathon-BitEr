import os
import spacy

# Load spaCy's English tokenizer
nlp = spacy.load("en_core_web_sm")

# Function to ensure that the directory exists, if not, it will be created
def ensure_directory_exists(directory):
    if not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist. Creating it...")
        os.makedirs(directory)

# Function to ensure the file exists, if not, it will be created
def ensure_file_exists(file_path, content=""):
    if not os.path.exists(file_path):
        print(f"File '{file_path}' does not exist. Creating it...")
        with open(file_path, 'w') as f:
            f.write(content)  # You can add default content here if needed.

# Function to tokenize work experience using spaCy
def tokenize_work_experience(input_file, output_file):
    # Ensure output directory exists
    ensure_directory_exists(os.path.dirname(output_file))

    # Read the content of the input file
    try:
        with open(input_file, 'r') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading the input file: {e}")
        return

    # Tokenize the content using spaCy
    doc = nlp(content)
    
    # Extract tokens that are not stop words and not punctuation
    tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]

    # If no tokens were extracted, create a file with a message
    if not tokens:
        with open(output_file, 'w') as f:
            f.write("No tokens extracted.\n")
        print(f"No tokens found. Output file saved as '{output_file}' with the message.")
        return

    # Write the tokenized content to the output file
    with open(output_file, 'w') as f:
        f.write("\n".join(tokens))  # Write each token on a new line

    print(f"Work experience tokens extracted and saved to '{output_file}'")

# Define the input and output file paths
input_work_experience_file = "D:/Certificates/Hackathon/Extracted File 2/Experience"
output_work_experience_tokenized_file = "D:/Certificates/Hackathon/Tokenized File/Work Experience Tokenized.txt"  # Save as .txt file

# Ensure the necessary directories and files exist
ensure_directory_exists("D:/Certificates/Hackathon/Tokenized File")
ensure_file_exists(input_work_experience_file)  # Make sure the input file exists

# Tokenize the work experience file using spaCy
tokenize_work_experience(input_work_experience_file, output_work_experience_tokenized_file)
