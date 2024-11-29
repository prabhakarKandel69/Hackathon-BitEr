import os
import spacy

# Load the large English language model
nlp = spacy.load("en_core_web_lg")


def extract_projects(text):
    """
    Extract the Projects section from the given text.
    :param text: The full text of the CV.
    :return: Extracted Projects section as a string.
    """
    # Define keywords typically associated with projects sections
    project_keywords = [
        "projects", "personal projects", "academic projects", "side projects",
        "professional projects", "research projects", "notable projects", "key projects"
    ]

    # Process the text using spaCy
    doc = nlp(text)

    # Split the text into sections based on new lines or headers
    lines = text.split("\n")

    projects = []
    capture = False  # Boolean flag to capture lines related to projects

    for line in lines:
        # Normalize the line for keyword matching
        normalized_line = line.lower().strip()

        # Check if the line contains any project keywords
        if any(keyword in normalized_line for keyword in project_keywords):
            capture = True  # Start capturing lines
            projects.append(line)  # Add the keyword line itself
            continue

        # Continue capturing if within the projects section
        if capture:
            if line.strip():  # Add non-empty lines
                projects.append(line)
            else:
                # If an empty line is encountered, stop capturing
                break

    # Join the extracted lines into a single block of text
    return "\n".join(projects) if projects else "No projects section found."

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




if __name__ == "__main__":
    # Define the path to the "File" directory relative to the script
    script_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
    file_directory = os.path.join(script_dir, "..", "Extracted File")  # Navigate to "File" directory

    # Ensure the "File" directory exists
    if not os.path.exists(file_directory):
        print(f"Error: The directory {file_directory} does not exist.")
        exit()

    # Look for text files in the "File" directory
    files = [f for f in os.listdir(file_directory) if f.endswith(".txt")]

    if not files:
        print(f"No text files found in {file_directory}.")
        exit()

    # Read the first text file (or modify to process all files)
    sample_cv_path = os.path.join(file_directory, files[0])
    cv_text = read_text_from_file(sample_cv_path)

    if cv_text:
        # Extract the Projects section
        projects_section = extract_projects(cv_text)

        # Output the extracted section
        print("Extracted Projects Section:")
        print(projects_section)
