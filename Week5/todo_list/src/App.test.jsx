import App from "./App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import ToDoList from './ToDoList';






test('renders ToDoList component', () => {
    render(<ToDoList />);

    // Check if the heading "My Todolist" is present
    const headingElement = screen.getByText(/My Todolist/i);
    expect(headingElement).toBeInTheDocument();

    // Check if the input fields are present
    const descriptionInput = screen.getByLabelText('Description');
    expect(descriptionInput).toBeInTheDocument();

    const priorityInput = screen.getByLabelText('Priority');
    expect(priorityInput).toBeInTheDocument();

    // Check if the DatePicker component is present
    const datePicker = screen.getByLabelText('Date');
    expect(datePicker).toBeInTheDocument();

    // Check if the "Add" button is present
    const addButton = screen.getByRole('button', { name: /Add/i });
    expect(addButton).toBeInTheDocument();

    // Check if the "Delete" button is present
    const deleteButton = screen.getByRole('button', { name: /Delete Todo/i });
    expect(deleteButton).toBeInTheDocument();

    // Check if the "Delete all" button is present
    const deleteAllButton = screen.getByRole('button', { name: /Delete All/i });
    expect(deleteAllButton).toBeInTheDocument();

    // Check if the grid container is present by test ID
    const gridContainer = screen.getByTestId('todo-grid-container');
    expect(gridContainer).toBeInTheDocument();
});


test("renders Welcome component", () => {
    render(<App />);
    const header = screen.getByText(/Welcome/i);
    expect(header).toBeInTheDocument();
});




test('renders todotable', () => {
    const row = [{ desc: 'Go to coffee', pririty: "High", date: '24.01.2023' }];

    render(<ToDoList todos={row} />);
    const table = screen.getByTestId('todo-grid-container');
    expect(table).toBeInTheDocument(/go to coffee/i);
});



test('input data into the table', () => {
    render(<ToDoList />);

    // Find input fields and change their values
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Go to coffee' } });

    const priorityInput = screen.getByLabelText('Priority');
    fireEvent.change(priorityInput, { target: { value: 'High' } });

    // Simulate selecting a date in the date picker
    const datePicker = screen.getByLabelText('Date');
    fireEvent.change(datePicker, { target: { value: '2023-01-24' } });

    // Click the "Add" button to add the todo item to the table
    const addButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(addButton);

    // Check if the todo item has been added to the table
    const table = screen.getByTestId('todo-grid-container');
    expect(table).toBeInTheDocument('Go to coffee');
    expect(table).toBeInTheDocument('High');
    expect(table).toBeInTheDocument('2023-01-24');
});




test('delete all todos', () => {
    // Stub the window.confirm method to always return true
    const originalConfirm = window.confirm;
    window.confirm = () => true;

    // Render the ToDoList component with some todos
    const row = [
        { desc: 'Go to coffee', priority: 'High', date: '24.01.2023' },
        { desc: 'Buy groceries', priority: 'Medium', date: '25.01.2023' },
        { desc: 'Finish project', priority: 'High', date: '26.01.2023' },
        { desc: 'Call mom', priority: 'Low', date: '27.01.2023' },
    ];
    render(<ToDoList todos={row} />);

    // Click on the Delete All button
    const deleteAllButton = screen.getByRole('button', { name: /delete all/i });
    fireEvent.click(deleteAllButton);

    // Assert that the table contains no rows after clicking the Delete All button
    const table = screen.getByTestId('todo-grid-container');
    const rows = table.querySelectorAll('.ag-row');
    expect(rows).toHaveLength(0);

    // Restore the original window.confirm method
    window.confirm = originalConfirm;
});


