package com.example.demo.student;

import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    // access all students
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    // add student
    public void addStudent(Student student){
        Boolean existsEmail = studentRepository.selectExistsEmail(student.getEmail());
        System.out.println(existsEmail);
        if(existsEmail){
            throw new BadRequestException("Email " + student.getEmail() + " taken.");

        } else {
            studentRepository.save(student);
        }

    }

    // delete student
    public void deleteStudent(Long studentId){
        if(!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException("Student with id " + studentId + " does not exist.");
        }
        studentRepository.deleteById(studentId);
    }

     // check if email exists (my attempt)
    public Boolean checkEmailExists(String email){
        return studentRepository.selectExistsEmail(email);
    }
}
