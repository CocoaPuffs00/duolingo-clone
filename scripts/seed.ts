import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database');

    await Promise.all([
      db.delete(schema.courses),
      db.delete(schema.userProgress),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.challenges),
      db.delete(schema.challengeOptions),
      db.delete(schema.challengeProgress),
    ]);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
      {
        id: 3,
        title: 'French',
        imageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Croatian',
        imageSrc: '/hr.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: 'Nouns',
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: 'Verbs',
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: 'Verbs',
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: 'Verbs',
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: 'Verbs',
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns,
        type: 'SELECT',
        order: 1,
        question: "Which one of these is the 'the man'?",
      },
      {
        id: 2,
        lessonId: 1, // Nouns,
        type: 'ASSIST',
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns,
        type: 'SELECT',
        order: 3,
        question: "Which one of these is the 'the robot'?",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // "Which one of these is the 'the man'?"
        correct: true,
        text: 'el hombre',
        imageSrc: '/man.svg',
        audioSrc: '/es_man.mp3',
      },
      {
        id: 2,
        challengeId: 1, // "Which one of these is the 'the man'?"
        correct: false,
        text: 'la mujer',
        imageSrc: '/woman.svg',
        audioSrc: '/es_woman.mp3',
      },
      {
        id: 3,
        challengeId: 1, // "Which one of these is the 'the man'?"
        correct: false,
        text: 'el robot',
        imageSrc: '/robot.svg',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 2, // "the man"?
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 2, // "the man"?
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // "Which one of these is the 'the robot'?"
        correct: false,
        text: 'el hombre',
        imageSrc: '/man.svg',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 3, // "Which one of these is the 'the robot'?"
        correct: false,
        text: 'la mujer',
        imageSrc: '/woman.svg',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 3, // "Which one of these is the 'the robot'?"
        correct: true,
        text: 'el robot',
        imageSrc: '/robot.svg',
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Verbs
        type: 'SELECT',
        order: 1,
        question: "Which one of these is the 'the man'?",
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: 'ASSIST',
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: 'SELECT',
        order: 3,
        question: "Which one of these is the 'the robot'?",
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
};

main();
