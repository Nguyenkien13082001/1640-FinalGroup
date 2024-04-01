import React, { useState } from "react";

export default function ClassQuestion() {
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [chapterTopics, setChapterTopics] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [questionCount, setQuestionCount] = useState(0); // Default value

  const classChapters = {
    "Class 10": [
      {
        id: 1,
        topics: ["Topic 1.1", "Topic 1.2", "Topic 1.3"],
        name: "Chapter 1",
      },
      {
        id: 2,
        topics: ["Topic 2.1", "Topic 2.2", "Topic 2.3"],
        name: "Chapter 2",
      },
      {
        id: 3,
        topics: ["Topic 3.1", "Topic 3.2", "Topic 3.3"],
        name: "Chapter 3",
      },
    ],
    "Class 11": [
      {
        id: 4,
        topics: ["Topic 4.1", "Topic 4.2", "Topic 4.3"],
        name: "Chapter 4",
      },
      {
        id: 5,
        topics: ["Topic 5.1", "Topic 5.2", "Topic 5.3"],
        name: "Chapter 5",
      },
      {
        id: 6,
        topics: ["Topic 6.1", "Topic 6.2", "Topic 6.3"],
        name: "Chapter 6",
      },
    ],
    // Thêm các chương cho các lớp khác tương ứng
  };

  const handleChapterChange = (chapter) => {
    if (selectedChapters.includes(chapter)) {
      setSelectedChapters(selectedChapters.filter((item) => item !== chapter));
      delete chapterTopics[chapter];
      setChapterTopics({ ...chapterTopics });
    } else {
      setSelectedChapters([...selectedChapters, chapter]);
    }
  };

  const handleTopicChange = (chapter, topic) => {
    const updatedChapterTopics = { ...chapterTopics };
    if (!updatedChapterTopics[chapter]) {
      updatedChapterTopics[chapter] = [];
    }
    if (updatedChapterTopics[chapter].includes(topic)) {
      updatedChapterTopics[chapter] = updatedChapterTopics[chapter].filter(
        (item) => item !== topic
      );
    } else {
      updatedChapterTopics[chapter].push(topic);
    }
    setChapterTopics(updatedChapterTopics);
  };

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
    setSelectedChapters([]); // Reset selected chapters
    setChapterTopics({}); // Reset chapter topics
    setQuestionCount(0); // Reset question count
  };

  const handleQuestionCountChange = (event) => {
    setQuestionCount(parseInt(event.target.value));
  };

  const generateExam = () => {
    // Logic to generate exam based on selectedClass, selectedChapters, chapterTopics, and questionCount
    console.log("Generating exam...");
  };

  return (
    <div className="ClassQuestionChoose">
      <h1 style={{ textAlign: "center" }}>Exam Builder</h1>
      <div>
        <div>
          <label>Select Class:</label>
          <select value={selectedClass} onChange={handleClassChange}>
            <option value="">-- Select Class --</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            {/* Add more class options as needed */}
          </select>
        </div>
        <div>
          <label>Total Questions:</label>
          <input
            className="TotalQuestion"
            type="number"
            value={questionCount}
            onChange={handleQuestionCountChange}
          />
        </div>
      </div>
      {selectedClass && (
        <div>
          {classChapters[selectedClass].map((chapter) => (
            <div key={chapter.id}>
              <input
                className="CheckboxCss"
                type="checkbox"
                checked={selectedChapters.includes(chapter.name)}
                onChange={() => handleChapterChange(chapter.name)}
              />
              {chapter.name}
              {selectedChapters.includes(chapter.name) &&
                chapter.topics.map((topic) => (
                  <div key={topic}>
                    <input
                      className="CheckboxCss1"
                      type="checkbox"
                      checked={
                        chapterTopics[chapter.name] &&
                        chapterTopics[chapter.name].includes(topic)
                      }
                      onChange={() => handleTopicChange(chapter.name, topic)}
                    />
                    {topic}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
      <div className="btn-center">
        {" "}
        <button style={{ width: "150px" }} onClick={generateExam}>
          Generate Exam
        </button>
      </div>
    </div>
  );
}
