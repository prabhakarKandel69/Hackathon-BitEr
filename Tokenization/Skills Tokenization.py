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

# Function to tokenize using spaCy
def tokenize_with_spacy(content):
    doc = nlp(content)  # Process the content using spaCy
    tokens = [token.text for token in doc]  # Extract tokens from spaCy doc
    return tokens

# Function to tokenize the content of the file using spaCy
def tokenize_file(input_file, output_file):
    # Ensure output directory exists
    ensure_directory_exists(os.path.dirname(output_file))

    # Read the content of the input file
    with open(input_file, 'r') as f:
        content = f.read()

    # Tokenize using spaCy
    spacy_tokens = tokenize_with_spacy(content)

    # Write the tokenized content to the output file
    with open(output_file, 'w') as f:
        f.write("spaCy Tokens:\n")
        f.write("\n".join(spacy_tokens))
        f.write("\n")

    print(f"Tokenized content saved to '{output_file}'")

# Define the input and output file paths
input_skills_file = "D:/Certificates/Hackathon/Extracted File 2/Skills"
output_skills_file = "D:/Certificates/Hackathon/Tokenized File/Skills Tokenized.txt"  # Save as .txt file

# Ensure the necessary directories and files exist
ensure_directory_exists("D:/Certificates/Hackathon/Tokenized File")
ensure_file_exists(input_skills_file)  # Make sure the input file exists

# Tokenize the skills file using spaCy
tokenize_file(input_skills_file, output_skills_file)
