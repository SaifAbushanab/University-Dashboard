from flask import Flask, jsonify, render_template
import pandas as pd

df = pd.read_csv("datasets/Student_Performance_Data.csv")
df2 = pd.read_csv("datasets/Student_data.csv")
df3 = pd.read_csv("datasets/Finance.csv")
df4 = pd.read_csv("datasets/Num_students.csv")

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get-datachart")
def get_datachart():
    classes = df["Paper_Name"].value_counts().index
    values = df["Paper_Name"].value_counts().values

    data = []

    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})

    return jsonify(data)


@app.route("/get-datachart2")
def get_datachart2():
    classes = df2["Major"].value_counts().index
    values = df2["Major"].value_counts().values

    data2 = []

    for i in range(len(classes)):
        data2.append({"class": classes[i], "value": int(values[i])})

    return jsonify(data2)


@app.route("/get-datachart3")
def get_datachart3():
    df3["year"] = df3["year"].astype(str)  # Convert "year" column to string
    data3 = df3[["year", "income", "expenses"]].to_dict(orient="records")

    return jsonify(data3)


@app.route("/get-datachart4")
def get_datachart4():
    classes = df4["year"]
    values = df4["value"]

    data4 = []

    for i in range(len(classes)):
        data4.append({"year": str(classes[i]), "value": int(values[i])})

    return jsonify(data4)


if __name__ == "__main__":
    app.run(debug=True)
