from flask import Flask, request, jsonify
import csv
import os

app = Flask(__name__)

# Path to the CSV file
data_file = "./data/accounts.csv"

# Ensure the data directory exists
os.makedirs(os.path.dirname(data_file), exist_ok=True)

# Ensure the CSV file has headers if it doesn't exist
if not os.path.exists(data_file):
    with open(data_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["email id", "phone number", "password", "First name", "last name", "address", "age"])

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    
    # Validate age
    if int(data.get("age", 0)) < 13:
        return jsonify({"error": "You must be 13 or older to sign up."}), 400
    
    # Save user details in CSV
    with open(data_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            data.get("email"),
            data.get("phone"),
            data.get("password"),
            data.get("firstName"),
            data.get("lastName"),
            data.get("address"),
            data.get("age")
        ])
    
    return jsonify({"message": "Account created successfully!"}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
