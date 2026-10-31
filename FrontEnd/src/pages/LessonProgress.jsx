
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function LessonProgress() {
  const [list, setList] = useState([]);
  const [lessonId, setLessonId] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");

  function loadData() {
    axios.get("http://localhost:8080/lessonProgress")
      .then(res => setList(res.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    loadData();
  }, []);

  function addData(e) {
    e.preventDefault();

    axios.post(
      "http://localhost:8080/lessonProgress/" + lessonId + "/" + enrollmentId,
      {}
    )
      .then(() => {
        alert("Lesson progress added");
        setLessonId("");
        setEnrollmentId("");
        loadData();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container mt-4">
      <h2>Lesson Progress</h2>

      <form className="card p-3 mb-4" onSubmit={addData}>
        <input className="form-control mb-3" type="number"
          placeholder="Lesson ID" value={lessonId}
          onChange={e => setLessonId(e.target.value)} required />

        <input className="form-control mb-3" type="number"
          placeholder="Enrollment ID" value={enrollmentId}
          onChange={e => setEnrollmentId(e.target.value)} required />

        <button className="btn btn-primary">Mark Lesson Complete</button>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr><th>ID</th><th>Lesson ID</th>
              <th>Enrollment ID</th><th>Completed At</th></tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.lessonid?.id}</td>
                <td>{item.enrollmentid?.id}</td>
                <td>{item.completedate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LessonProgress;
