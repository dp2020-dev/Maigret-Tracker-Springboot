package com.testiotech.maigret_tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class MaigretBook {

    @Id
    @Column(name = "title")
    private String title;

    @Column(name = "alt_titles")
    private String altTitles;

    @Column(name = "original_title")
    private String originalTitle;

    @Column(name = "pub_year")
    private Integer pubYear;

    @Column(name = "read_status")
    private Boolean readStatus;

    @Column(name = "notes")
    private String notes;

    // Getters and setters
    public String getTitle() { return title; }
    public String getAltTitles() { return altTitles; }
    public String getOriginalTitle() { return originalTitle; }
    public Integer getPubYear() { return pubYear; }
    public Boolean getReadStatus() { return readStatus; }
    public String getNotes() { return notes; }

    public void setTitle(String title) { this.title = title; }
    public void setAltTitles(String altTitles) { this.altTitles = altTitles; }
    public void setOriginalTitle(String originalTitle) { this.originalTitle = originalTitle; }
    public void setPubYear(Integer pubYear) { this.pubYear = pubYear; }
    public void setReadStatus(Boolean readStatus) { this.readStatus = readStatus; }
    public void setNotes(String notes) { this.notes = notes; }
}