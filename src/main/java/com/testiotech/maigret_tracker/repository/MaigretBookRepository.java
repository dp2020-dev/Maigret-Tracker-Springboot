package com.testiotech.maigret_tracker.repository;

import com.testiotech.maigret_tracker.model.MaigretBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MaigretBookRepository extends JpaRepository<MaigretBook, String> {

    @Query("SELECT b FROM MaigretBook b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<MaigretBook> searchByTitle(@Param("keyword") String keyword);
}