package com.testiotech.maigret_tracker.controller;

import com.testiotech.maigret_tracker.model.MaigretBook;
import com.testiotech.maigret_tracker.repository.MaigretBookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class MaigretBookApiController {

    private final MaigretBookRepository repository;

    public MaigretBookApiController(MaigretBookRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MaigretBook> getAllBooks() {
        return repository.findAll();
    }

    @GetMapping("/{title}")
    public MaigretBook getBook(@PathVariable String title) {
        return repository.findById(title).orElseThrow();
    }

    @PatchMapping("/{title}/read")
    public MaigretBook toggleRead(@PathVariable String title) {
        MaigretBook book = repository.findById(title).orElseThrow();
        book.setReadStatus(!Boolean.TRUE.equals(book.getReadStatus()));
        return repository.save(book);
    }
}