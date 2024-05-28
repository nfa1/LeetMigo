//dependencies
import { useState } from "react";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";

//local files
import {
  createDecisionMap,
  generateProblem,
  requestFeedback,
  TreeNode,
  SelectedPath,
  CopyableMarkdown,
} from "./Leetmigo.compute";
import { colorPalette, responsiveBox } from "./Leetmigo.styles";

/**
 * RenderLeetmigo component renders the main application.
 * @returns {JSX.Element} The rendered component.
 */
export const RenderLeetmigo = () => {
  let mapImage = createDecisionMap();

  const [currentNode, setCurrentNode] = useState(mapImage);
  const [selectedPath, setSelectedPath] = useState([]);
  const [contentStack, setContentStack] = useState([]);
  const [codeStack, setCodeStack] = useState([]);
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [isGeneratingProblem, setIsGeneratingProblem] = useState(false);
  const [generationError, setGenerationError] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  /**
   * Handles the selection of a node from the tree.
   * @param {string} childKey - The key of the selected child node.
   */
  const handleSelect = (childKey) => {
    const newNode = currentNode.children[childKey];
    setCurrentNode(newNode);
    setSelectedPath((prev) => [...prev, childKey]);
    setContentStack((prev) => [
      ...prev,
      newNode?.children?.content?.content || "",
    ]);
    setCodeStack((prev) => [...prev, newNode?.children?.code?.content || ""]);
  };

  /**
   * Handles the undo action to go back to the previous node in the selected path.
   */
  const handleUndo = () => {
    if (selectedPath.length > 0) {
      const newPath = [...selectedPath];
      newPath.pop();
      setSelectedPath(newPath);

      const newContentStack = [...contentStack];
      newContentStack.pop();
      setContentStack(newContentStack);

      const newCodeStack = [...codeStack];
      newCodeStack.pop();
      setCodeStack(newCodeStack);

      let node = mapImage;
      newPath.forEach((key) => {
        node = node.children[key];
      });
      setCurrentNode(node);
    }
  };

  /**
   * Handles the reset action to reset the selected path, content stack, and code stack.
   */
  const handleReset = () => {
    setCurrentNode(mapImage);
    setSelectedPath([]);
    setContentStack([]);
    setCodeStack([]);
  };

  /**
   * Handles the generation of a new problem by calling the generateProblem function.
   */
  const handleGenerateProblem = async () => {
    setGenerationError(false);
    setIsGeneratingProblem(true);

    try {
      const result = await generateProblem();
      console.log("result", result);
      setGeneratedProblem(result);
    } catch (error) {
      setGenerationError(true);
    }

    setIsGeneratingProblem(false);
  };

  /**
   * Handles the submission of feedback by calling the requestFeedback function.
   */
  const handleFeedbackSubmit = async () => {
    setGenerationError(false);
    setIsGeneratingFeedback(true);
    try {
      const result = await requestFeedback(
        generatedProblem,
        selectedPath,
        contentStack,
        codeStack,
        feedback
      );
      setFeedbackResult(result);
      setIsGeneratingFeedback(false);
    } catch (error) {
      setGenerationError(true);
    }
  };

  return (
    <div style={responsiveBox}>
      <div style={{ backgroundColor: colorPalette.chill, padding: 24 }}>
        Generate a problem and then use the following decision paths to learn
        common algorithm solutions and strategies. Submit your solution or
        request feedback on your progress to improve your interview skills.
      </div>
      <br />
      <br />
      <Button
        variant="dark"
        onClick={handleGenerateProblem}
        disabled={isGeneratingProblem}
      >
        Create algorithm problem
      </Button>
      <br />
      <br />
      {isGeneratingProblem && <p>Creating problem set...</p>}
      {generatedProblem && (
        <>
          <div
            style={{
              ...responsiveBox,
              backgroundColor: "white",
              color: "black",
              borderRadius: 50,
              padding: 50,
            }}
          >
            <CopyableMarkdown content={generatedProblem} />
          </div>
          <br />
          <br />
          Select a path and make decisions to choose a solution for your
          algorithm problem.
          <TreeNode node={currentNode} onSelect={handleSelect} />
          {selectedPath.length === 0 ? null : (
            <>
              <SelectedPath
                path={selectedPath}
                contentStack={contentStack}
                codeStack={codeStack}
                onUndo={handleUndo}
                onReset={handleReset}
              />
            </>
          )}
          <br />
          <br />
          <div>
            <label>Get feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter or explain your solution and request feedback"
              rows="8"
              style={{ width: "100%", padding: "10px" }}
            ></textarea>
            <br />
            <br />
            <Button
              variant="dark"
              onClick={handleFeedbackSubmit}
              disabled={isGeneratingFeedback}
            >
              Submit Feedback Request
            </Button>
            <br />
            <br />
            {isGeneratingFeedback ? "Creating feedback..." : null}
          </div>
          {feedbackResult && (
            <div
              style={{
                ...responsiveBox,
                backgroundColor: "white",
                color: "black",
                borderRadius: 50,
                padding: 50,
              }}
            >
              <Markdown>{feedbackResult}</Markdown>
            </div>
          )}
        </>
      )}
      {generationError && <p>Error generating problem. Please try again.</p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};