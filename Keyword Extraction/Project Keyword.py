import os
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer

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

# Function to extract keywords using TF-IDF
def extract_keywords(input_file, output_file):
    # Ensure output directory exists
    ensure_directory_exists(os.path.dirname(output_file))

    # Read the content of the input file (tokenized content)
    with open(input_file, 'r') as f:
        content = f.read()

    # Tokenize the content using spaCy
    doc = nlp(content)
    # Extract tokens that are not stop words and not punctuation
    tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]

    # Convert tokens back into a string format for TF-IDF
    content_for_tfidf = ' '.join(tokens)

    # Using TF-IDF to extract keywords
    vectorizer = TfidfVectorizer(max_features=10)  # Limit to 10 important keywords
    tfidf_matrix = vectorizer.fit_transform([content_for_tfidf])  # Fit TF-IDF on the text
    feature_names = vectorizer.get_feature_names_out()  # Get the top terms

    # Write the extracted keywords to the output file
    with open(output_file, 'w') as f:
        f.write("Important Keywords for Project:\n")
        for keyword in feature_names:
            f.write(f"{keyword}\n")

    print(f"Keywords extracted and saved to '{output_file}'")

# Define the input and output file paths
input_project_tokenized_file = "D:/Certificates/Hackathon/Tokenized File/Project Tokenized.txt"
output_project_keywords_file = "D:/Certificates/Hackathon/Keyword Extraction/Project Keyword.txt"  # Save as .txt

# Ensure the necessary directories and files exist
ensure_directory_exists("D:/Certificates/Hackathon/Keyword Extraction")
ensure_file_exists(input_project_tokenized_file)  # Make sure the tokenized input file exists

# Extract keywords from the tokenized project file
extract_keywords(input_project_tokenized_file, output_project_keywords_file)
