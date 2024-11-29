import os
import spacy

# Load the large English language model
nlp = spacy.load("en_core_web_lg")

def extract_projects(text):
    # Keywords for the projects section
    project_keywords = [
        "projects", "personal projects", "academic projects", "side projects",
        "professional projects", "research projects", "notable projects", "key projects"
    ]

    lines = text.split("\n")
    projects = []
    capture = False

    for line in lines:
        normalized_line = line.lower().strip()
        if any(keyword in normalized_line for keyword in project_keywords):
            capture = True
            projects.append(line)
            continue
        if capture:
            if line.strip():
                projects.append(line)
            else:
                break

    return "\n".join(projects) if projects else "No projects section found."

def read_text_from_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def write_text_to_file(file_path, content):
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

    # Check for text files in the input directory
    files = [f for f in os.listdir(input_directory) if f.endswith(".txt")]
    if not files:
        print(f"No text files found in {input_directory}. Exiting...")
        exit()

    for file_name in files:
        input_file_path = os.path.join(input_directory, file_name)
        output_file_path = os.path.join(output_directory, f"Project")

        cv_text = read_text_from_file(input_file_path)

        if cv_text:
            # Extract the projects section
            projects_section = extract_projects(cv_text)

            # Write the extracted content to the output file
            write_text_to_file(output_file_path, projects_section)

            print(f"Processed {file_name}. Extracted content saved to {output_file_path}")
