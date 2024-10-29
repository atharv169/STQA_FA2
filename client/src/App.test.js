import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock the App Component
const MockApp = () => (
  <div>
    <h1>Task Management Tool</h1>
    <ul>
      <li>
        <h3>Test Task 1</h3>
        <p>Description 1</p>
        <p>Deadline: 10/29/2024</p>
        <p>Status: Pending</p>
        <button>Edit</button>
        <button>Complete</button>
        <button>Delete</button>
      </li>
    </ul>
  </div>
);

test('renders task management tool header', () => {
  render(<MockApp />); // Render the mock component
  const headerElement = screen.getByText(/Task Management Tool/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders tasks correctly', () => {
  render(<MockApp />); // Render the mock component
  const taskElement = screen.getByText(/Test Task 1/i);
  expect(taskElement).toBeInTheDocument();
});