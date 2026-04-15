// package com.testiotech.maigret_tracker.controller;
// import com.testiotech.maigret_tracker.model.MaigretBook;
// import com.testiotech.maigret_tracker.repository.MaigretBookRepository;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import java.util.List;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import java.net.URLEncoder;
// import java.nio.charset.StandardCharsets;
// import java.util.stream.Collectors;

// @Controller
// @RequestMapping("/books")
// public class MaigretBookViewController {

//     private final MaigretBookRepository repository;

//     public MaigretBookViewController(MaigretBookRepository repository) {
//         this.repository = repository;
//     }

//     @GetMapping
//     public String books(Model model) {
//         List<MaigretBook> allBooks = repository.findAll();
//         long booksRead = allBooks.stream()
//                 .filter(b -> Boolean.TRUE.equals(b.getReadStatus()))
//                 .count();
//         model.addAttribute("books", allBooks);
//         model.addAttribute("totalBooks", allBooks.size());
//         model.addAttribute("booksRead", booksRead);
//         return "books";
//     }

//     @GetMapping("/search")
//         public String search(@RequestParam(required = false) String keyword, Model model) {
//             if (keyword != null && !keyword.isBlank()) {
//                 model.addAttribute("books", repository.searchByTitle(keyword));
//                 model.addAttribute("keyword", keyword);
//             }
//             return "search";
//         }

//     @GetMapping("/all")
//     public String allBooks(Model model) {
//         List<MaigretBook> books = repository.findAll()
//                 .stream()
//                 .sorted((a, b) -> Integer.compare(
//                     a.getPubYear() == null ? 0 : a.getPubYear(),
//                     b.getPubYear() == null ? 0 : b.getPubYear()))
//                 .collect(java.util.stream.Collectors.toList());
//         model.addAttribute("books", books);
//         model.addAttribute("listTitle", "All Books");
//         return "booklist";
//     }

//     @GetMapping("/read")
//     public String readBooks(Model model) {
//         List<MaigretBook> books = repository.findAll()
//                 .stream()
//                 .filter(b -> Boolean.TRUE.equals(b.getReadStatus()))
//                 .sorted((a, b) -> Integer.compare(
//                     a.getPubYear() == null ? 0 : a.getPubYear(),
//                     b.getPubYear() == null ? 0 : b.getPubYear()))
//                 .collect(java.util.stream.Collectors.toList());
//         model.addAttribute("books", books);
//         model.addAttribute("listTitle", "Books Read");
//         return "booklist";
//     }

//     @GetMapping("/unread")
//     public String unreadBooks(Model model) {
//         List<MaigretBook> books = repository.findAll()
//                 .stream()
//                 .filter(b -> !Boolean.TRUE.equals(b.getReadStatus()))
//                 .sorted((a, b) -> Integer.compare(
//                     a.getPubYear() == null ? 0 : a.getPubYear(),
//                     b.getPubYear() == null ? 0 : b.getPubYear()))
//                 .collect(java.util.stream.Collectors.toList());
//         model.addAttribute("books", books);
//         model.addAttribute("listTitle", "To Read");
//         return "booklist";
//     }


//     @PostMapping("/toggle-read")
//     public String toggleRead(@RequestParam String title,
//                             @RequestParam(required = false) String keyword) {
//         MaigretBook book = repository.findById(title).orElseThrow();
//         book.setReadStatus(!Boolean.TRUE.equals(book.getReadStatus()));
//         repository.save(book);
//         String encodedKeyword = URLEncoder.encode(keyword != null ? keyword : "", StandardCharsets.UTF_8);
//         return "redirect:/books/search?keyword=" + encodedKeyword;
//     }

//     @PostMapping("/update-notes")
//     public String updateNotes(@RequestParam String title,
//                             @RequestParam(required = false) String notes,
//                             @RequestParam(required = false) String keyword) {
//         MaigretBook book = repository.findById(title).orElseThrow();
//         book.setNotes(notes);
//         repository.save(book);
//         String encodedKeyword = URLEncoder.encode(keyword != null ? keyword : "", StandardCharsets.UTF_8);
//         return "redirect:/books/search?keyword=" + encodedKeyword;
//     }
// }