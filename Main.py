import os
import subprocess

# Define the scripts in the order they should be executed
execution_order = [
    "1. Data Extraction/data_extraction.py",

    "2. Data Organization/Project Extraction.py",
    "2. Data Organization/Skills Extraction.py",
    "2. Data Organization/Work Experience Extraction.py",

    "3. Tokenization/Project Tokenization.py",
    "3. Tokenization/Skills Tokenization.py",
    "3. Tokenization/Work Experience Tokenization.py",
    
    "4. Keyword Extraction/Project Keyword.py",
    "4. Keyword Extraction/Skills Keyword.py",
    "4. Keyword Extraction/Work Experience Keyword.py",
    
    "5. Individual Score/Project Score.py",
    "5. Individual Score/Skills Score.py",
    "5. Individual Score/Work Experience.py",
    
    "6. Combine Score/Name.py",
    "6. Combine Score/Combine Score.py",
    
    "Send File to Database.py"
]

# Function to execute a Python script and log its output
def execute_script(script_path):
    try:
        print(f"Executing: {script_path}")
        result = subprocess.run(
            ["python", script_path],
            capture_output=True, text=True, check=True
        )
        print(f"Output:\n{result.stdout}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while executing {script_path}:\n{e.stderr}")

# Main function to iterate through the execution order
def main():
    for script in execution_order:
        # Ensure the script exists before attempting to execute it
        if os.path.exists(script):
            execute_script(script)
        else:
            print(f"Script not found: {script}")

if __name__ == "__main__":
    main()





