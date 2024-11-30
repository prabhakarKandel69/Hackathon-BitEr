import requests
import json
import os

# File paths
json_file_path = "D:/Certificates/Hackathon/Final Score.json"

# URL of the live server PHP endpoint
url = "https://poudelsangam.com.np/hackathon/endpoint.php"

# Function to read data from the JSON file
def read_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    else:
        print(f"JSON file '{file_path}' not found.")
        return None

# Load the JSON data
data = read_json(json_file_path)

if data:
    try:
        # Safely extract required fields, defaulting to 0.0 if a key is missing
        request_data = {
            "cv_sender_name": data.get("Name", "Unknown"),
            "cv_sender_work_experience_score": data.get("Final Score Breakdown", {})
                                                   .get("Work Experience", {})
                                                   .get("Weighted Score (out of 50)", 0.0),
            "cv_sender_project_score": data.get("Final Score Breakdown", {})
                                           .get("Projects", {})
                                           .get("Weighted Score (out of 30)", 0.0),
            "cv_sender_skills_score": data.get("Final Score Breakdown", {})
                                          .get("Skills", {})
                                        .get("Weighted Score (out of 20)", 0.0),
            "cv_sender_finalscore": data.get("Final Score", 0.0)
        }
        print(request_data)

        # Sending the JSON data as a POST request
        response = requests.post(url, json=request_data, headers={'Content-Type': 'application/json'})

        # Print server response
        print(f'Status Code: {response.status_code}')
        print('Response:', response.text)
    except Exception as e:
        print(f"An error occurred while processing the JSON data: {e}")
else:
    print("Failed to send data. JSON file could not be loaded.")



"""
print("Request Data:")
print(f"  Name: {request_data['cv_sender_name']}")
print(f"  Work Experience Score: {request_data['cv_sender_work_experience_score']}")
print(f"  Project Score: {request_data['cv_sender_project_score']}")
print(f"  Skills Score: {request_data['cv_sender_skills_score']}")
print(f"  Final Score: {request_data['cv_sender_finalscore']}")
"""