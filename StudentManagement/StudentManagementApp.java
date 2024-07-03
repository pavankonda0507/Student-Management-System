package StudentManagement;

import javax.swing.*;
import java.awt.*;

public class StudentManagementApp {
    private StudentManagementSystem sms;

    public StudentManagementApp() {
        sms = new StudentManagementSystem();
        createGUI();
    }

    private void createGUI() {
        JFrame frame = new JFrame("Student Management System");
        frame.setSize(600, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(6, 2));

        JLabel nameLabel = new JLabel("Name:");
        JTextField nameField = new JTextField();
        JLabel rollLabel = new JLabel("Roll Number:");
        JTextField rollField = new JTextField();
        JLabel gradeLabel = new JLabel("Grade:");
        JTextField gradeField = new JTextField();

        panel.add(nameLabel);
        panel.add(nameField);
        panel.add(rollLabel);
        panel.add(rollField);
        panel.add(gradeLabel);
        panel.add(gradeField);

        JButton addButton = new JButton("Add Student");
        addButton.addActionListener(e -> {
            String name = nameField.getText();
            String rollNumber = rollField.getText();
            String grade = gradeField.getText();

            if (name.isEmpty() || rollNumber.isEmpty() || grade.isEmpty()) {
                JOptionPane.showMessageDialog(frame, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
            } else {
                Student student = new Student(name, rollNumber, grade);
                sms.addStudent(student);
                JOptionPane.showMessageDialog(frame, "Student added successfully.");
                nameField.setText("");
                rollField.setText("");
                gradeField.setText("");
            }
        });

        JButton searchButton = new JButton("Search Student");
        searchButton.addActionListener(e -> {
            String rollNumber = JOptionPane.showInputDialog("Enter Roll Number:");
            Student student = sms.searchStudent(rollNumber);
            if (student != null) {
                JOptionPane.showMessageDialog(frame, student.toString());
            } else {
                JOptionPane.showMessageDialog(frame, "Student not found.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        JButton removeButton = new JButton("Remove Student");
        removeButton.addActionListener(e -> {
            String rollNumber = JOptionPane.showInputDialog("Enter Roll Number:");
            sms.removeStudent(rollNumber);
            JOptionPane.showMessageDialog(frame, "Student removed successfully.");
        });

        JButton displayButton = new JButton("Display All Students");
        displayButton.addActionListener(e -> {
            StringBuilder studentsList = new StringBuilder("All Students:\n");
            for (Student student : sms.getAllStudents()) {
                studentsList.append(student.toString()).append("\n");
            }
            JOptionPane.showMessageDialog(frame, studentsList.toString());
        });

        panel.add(addButton);
        panel.add(searchButton);
        panel.add(removeButton);
        panel.add(displayButton);

        frame.add(panel, BorderLayout.CENTER);
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(StudentManagementApp::new);
    }
}
