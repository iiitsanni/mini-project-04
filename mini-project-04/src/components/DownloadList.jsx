import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// PDF document template for downloading wishlisted or watched movie lists
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
    },
    item: {
        fontSize: 12,
        marginBottom: 6,
    },
});

const DownloadList = ({ movies = [], listTitle = 'My List' }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>{listTitle}</Text>
            {movies.map((movie, index) => (
                <Text key={movie.title} style={styles.item}>
                    {index + 1}. {movie.title} - {movie.releasing_year ? `(${movie.releasing_year})` : ''} - {movie.genre} - IMDB Rating: {movie.imdb_rating} - {movie.runtime} 
                </Text>
            ))}
        </Page>
    </Document>
);

export default DownloadList;
