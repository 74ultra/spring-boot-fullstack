package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query(
            value = "SELECT EXISTS (SELECT * FROM student WHERE email=:email)",
            nativeQuery = true
    )
    Boolean selectExistsEmail(String email);

//    @Query("SELECT CASE WHEN COUNT(s)>0 THEN " + "TRUE ELSE FALSE END " + "FROM student s " + "WHERE s.email=?1")
//    Boolean selectExistsEmail(String email);
}
