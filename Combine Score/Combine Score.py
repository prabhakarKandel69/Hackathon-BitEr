import os
import json

# Function to read the score from a file
def read_score(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            for line in file:
                if line.startswith("Score:"):
                    try:
                        return float(line.split(":")[1].strip())
                    except ValueError:
                        print(f"Invalid score format in '{file_path}'.")
                        return 0.0
    else:
        print(f"Score file '{file_path}' not found.")
    return 0.0

# Function to calculate the final score
def calculate_final_score(scores, weights):
    weighted_scores = {key: scores[key] * weights[key] for key in scores}
    final_score = sum(weighted_scores.values())
    return weighted_scores, round(final_score, 2)

# Function to extract the name from the extracted file
def extract_name(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            for line in file:
                if line.strip():  # Return the first non-empty line as the name
                    return line.strip()
    else:
        print(f"Extracted file '{file_path}' not found.")
    return "Unknown"

# File paths
score_output_dir = "D:/Certificates/Hackathon/Score Output"
extracted_file_path = "D:/Certificates/Hackathon/Extracted File 2/Name.txt"  # Path to the file with the name
output_file = "D:/Certificates/Hackathon/Final Score.json"

# File names for scores
files = {
    "Work Experience": os.path.join(score_output_dir, "Work Experience Score.txt"),
    "Projects": os.path.join(score_output_dir, "Project Score.txt"),
    "Skills": os.path.join(score_output_dir, "Skills Score.txt"),
}

# Read scores
scores = {key: read_score(file_path) for key, file_path in files.items()}

# Weightage for each category
weights = {
    "Work Experience": 0.50,
    "Projects": 0.30,
    "Skills": 0.20,
}

# Maximum score for each category
max_scores = {
    "Work Experience": 50.0,
    "Projects": 30.0,
    "Skills": 20.0,
}

# Calculate weighted scores and final score
weighted_scores, final_score = calculate_final_score(scores, weights)

# Extract the name
name = extract_name(extracted_file_path)

# Prepare the JSON data
output_data = {
    "Name": name,
    "Final Score Breakdown": {
        category: {
            "Score" : round(weighted_scores[category] / weights[category], 2),
            "Weighted Score (out of {})".format(int(max_scores[category])): round(weighted_scores[category], 2)
        }
        for category in weighted_scores
    },
    "Final Score": final_score
}

# Write the JSON data to the output file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(output_data, file, indent=4)

print(f"Final score and breakdown saved to '{output_file}'.")
