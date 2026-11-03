/* Fixed values used across the app: day names, priorities, the list of
   views, spaced-repetition intervals and the schedule grid size. (The ready-made
   study topics are in topics.js.) Loaded first; has no dependencies.

   All the js/ files are normal <script> files (not ES modules, which do not
   work when a page is opened straight from a file). Normal scripts share one
   global scope, so a file can use anything declared in a file loaded before
   it. The order is set in each page's HTML. */
'use strict';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLOR_NAMES = ['Coral', 'Teal', 'Violet', 'Amber', 'Blue', 'Rose'];
const PRI = { high: 'High', med: 'Medium', low: 'Low' };
const PR = { high: 0, med: 1, low: 2 };
const VIEWS = ['overview', 'tasks', 'plans', 'schedule', 'flashcards', 'focus', 'subjects'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const INTERVALS = [0, 1, 2, 4, 8, 16];
const H0 = 7, H1 = 22, RH = 44;
