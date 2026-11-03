/* Ready-made subjects for the Study Plans generator, grouped by field.

   Each subject has topics at three levels; a study plan spreads the chosen
   level's topics over the days you pick. A topic is "Name - details".
   The lists follow the core courses of typical university programmes
   (ACM/IEEE CS2023 for Computer Science; common BSc Electrical Engineering
   and BBA/AACSB business cores). Needs: nothing. */
'use strict';

const FIELDS = ['Computer Science', 'Electrical Engineering', 'Business'];

const BUILTIN = {

  /* ===== Computer Science ===== */
  "DSA": {
    field: "Computer Science",
    name: "Data Structures & Algorithms",
    desc: "Master the fundamentals of computer science with in-depth coverage of data structures and algorithms",
    Beginner: [
      "Arrays & Strings - Indexing, searching, sorting basics",
      "Linked Lists - Singly linked list, operations",
      "Stacks & Queues - LIFO/FIFO operations",
      "Hash Tables - Hashing, collision handling",
      "Sorting Basics - Bubble, selection, insertion sort",
      "Big O Notation - Time & space complexity analysis"
    ],
    Intermediate: [
      "Binary Search Trees - BST operations, traversals",
      "Graphs & BFS/DFS - Graph representations, traversals",
      "Dynamic Programming Intro - Memoization basics",
      "Greedy Algorithms - Activity selection, fractional knapsack",
      "Backtracking - N-Queens, permutations, combinations",
      "Heaps & Priority Queues - Min/Max heap implementation"
    ],
    Advanced: [
      "Advanced DP - Longest subsequences, matrix chain multiplication",
      "Network Flow - Max flow, Ford-Fulkerson algorithm",
      "Segment Trees - Range queries, updates",
      "Tries & String Matching - KMP, Rabin-Karp algorithms",
      "NP-Complete Problems - Recognition & approximation",
      "Graph Algorithms - Dijkstra, Floyd-Warshall, Bellman-Ford"
    ]
  },
  "Python": {
    field: "Computer Science",
    name: "Python Programming",
    desc: "Learn Python from basics to advanced OOP, web development, and data science applications",
    Beginner: [
      "Syntax & Variables - Data types, variable assignment",
      "Control Flow - if/else statements, loops (for, while)",
      "Functions & Scope - Function definition, parameters, return values",
      "Data Types - Lists, tuples, dictionaries, sets",
      "String Operations - String methods, f-strings, formatting",
      "File I/O - Reading, writing, file operations"
    ],
    Intermediate: [
      "OOP Basics - Classes, objects, inheritance, polymorphism",
      "Modules & Packages - Import system, creating modules",
      "Exception Handling - Try-except blocks, custom exceptions",
      "Decorators & Closures - Function decorators, nested functions",
      "Generators & Iterators - yield keyword, generator functions",
      "List Comprehensions - Concise list creation, nested comprehensions"
    ],
    Advanced: [
      "Async Programming - asyncio, async/await, event loops",
      "Metaclasses - Class creation, __new__, __init__",
      "Performance Optimization - Profiling, caching, optimization",
      "Testing & Debugging - unittest, pytest, debugging techniques",
      "Design Patterns - Singleton, Factory, Observer, Strategy",
      "Memory Management - Garbage collection, optimization tips"
    ]
  },
  "Web Dev": {
    field: "Computer Science",
    name: "Web Development",
    desc: "Full-stack web development covering frontend, backend, and deployment",
    Beginner: [
      "HTML Basics - Semantic HTML, forms, accessibility",
      "CSS Styling - Flexbox, Grid, responsive design",
      "JavaScript Fundamentals - Variables, functions, DOM",
      "DOM Manipulation - querySelector, event listeners",
      "Forms & Validation - Form handling, client-side validation",
      "Responsive Design - Media queries, mobile-first approach"
    ],
    Intermediate: [
      "React Hooks - useState, useEffect, custom hooks",
      "Component Architecture - Composition, reusable components",
      "REST APIs - Fetch API, axios, error handling",
      "Routing - React Router, navigation, params",
      "CSS Frameworks - Tailwind CSS, Bootstrap integration",
      "Local Storage & Session - Browser storage APIs"
    ],
    Advanced: [
      "Performance Optimization - Code splitting, lazy loading, memoization",
      "Testing - Jest, React Testing Library, E2E testing",
      "Deployment - Vercel, Netlify, GitHub Pages, CI/CD",
      "Security - CORS, XSS prevention, CSRF tokens, authentication",
      "Advanced Patterns - HOC, Render Props, Compound Components",
      "Server-Side Rendering - Next.js, SSR concepts"
    ]
  },
  "Machine Learning": {
    field: "Computer Science",
    name: "Machine Learning & AI",
    desc: "Comprehensive guide to machine learning, deep learning, and AI applications",
    Beginner: [
      "Python for ML - NumPy arrays, Pandas dataframes",
      "Data Preprocessing - Cleaning, handling missing values",
      "Exploratory Data Analysis - Statistics, visualization",
      "Linear Regression - Cost function, gradient descent",
      "Logistic Regression - Binary classification, probability",
      "Decision Trees - Tree construction, pruning, visualization"
    ],
    Intermediate: [
      "Random Forests - Ensemble methods, bagging, feature importance",
      "K-Means Clustering - Unsupervised learning, centroid updates",
      "Principal Component Analysis - Dimensionality reduction",
      "Support Vector Machines - Kernel methods, margin maximization",
      "Neural Networks Basics - Perceptron, backpropagation",
      "Model Evaluation - Confusion matrix, precision, recall, F1-score"
    ],
    Advanced: [
      "Deep Learning - CNNs for image recognition, RNNs for sequences",
      "Natural Language Processing - Tokenization, embeddings, BERT",
      "Computer Vision - Image classification, object detection",
      "Reinforcement Learning - Q-learning, policy gradient",
      "Transfer Learning - Pre-trained models, fine-tuning",
      "Model Deployment - TensorFlow Serving, containerization"
    ]
  },
  "JavaScript": {
    field: "Computer Science",
    name: "JavaScript Mastery",
    desc: "Deep dive into JavaScript ES6+, async programming, and modern frameworks",
    Beginner: [
      "Variables & Scope - var, let, const, block scope",
      "Data Types & Operators - Primitives, type coercion",
      "Functions & Arrow Functions - Function declarations, arrow syntax",
      "Objects & Arrays - Object methods, array manipulation",
      "DOM & Events - Event handling, event delegation",
      "Promise Basics - Promise creation, then/catch chaining"
    ],
    Intermediate: [
      "Async/Await - Async functions, error handling with try-catch",
      "Closures & Hoisting - Variable hoisting, closure patterns",
      "Prototypes & Inheritance - Prototype chain, constructor functions",
      "Modules - ES6 import/export, module patterns",
      "Error Handling - Custom errors, error stack traces",
      "Regular Expressions - Regex patterns, exec, match, replace"
    ],
    Advanced: [
      "Advanced Closures - Module pattern, data privacy",
      "Event Loop & Microtasks - Execution context, call stack",
      "Web Workers - Multi-threading in JavaScript",
      "Memory Leaks - Detecting and preventing memory issues",
      "Design Patterns - Singleton, Observer, Module pattern",
      "Advanced Async - Race conditions, concurrent operations"
    ]
  },
  "React": {
    field: "Computer Science",
    name: "React & Frontend",
    desc: "Master React for building modern, scalable, and performant web applications",
    Beginner: [
      "JSX & Components - Function components, JSX syntax",
      "Props & State - Component props, useState hook",
      "Hooks (useState, useEffect) - Managing component lifecycle",
      "Conditional Rendering - if/else, ternary, logical AND",
      "Lists & Keys - Rendering lists, key prop importance",
      "Form Handling - Controlled components, input handling"
    ],
    Intermediate: [
      "Context API - Creating context, useContext hook",
      "Custom Hooks - Building reusable hooks, hook rules",
      "useReducer - Complex state management, reducer pattern",
      "Performance Optimization - useMemo, useCallback, React.memo",
      "Code Splitting - Dynamic imports, lazy loading",
      "Error Boundaries - Error handling in components"
    ],
    Advanced: [
      "Advanced Patterns - HOC, Render Props, composition",
      "Server Components - RSC concepts, async components",
      "Suspense & Lazy Loading - Code splitting, data fetching",
      "Concurrent Features - Transitions, startTransition",
      "React Testing - Component testing, hooks testing",
      "State Management - Redux, Zustand, Jotai integration"
    ]
  },
  "Programming Fundamentals": {
    field: "Computer Science",
    name: "Programming Fundamentals (C)",
    desc: "First programming course: variables, control flow, functions, arrays and memory in C",
    Beginner: [
      "Variables & Data Types - int, float, char, type sizes",
      "Operators & Expressions - arithmetic, logical, precedence",
      "Conditionals - if/else, switch",
      "Loops - for, while, do-while, nested loops",
      "Functions - parameters, return values, scope",
      "Arrays - declaration, traversal, 2D arrays"
    ],
    Intermediate: [
      "Pointers - addresses, dereferencing, pointer arithmetic",
      "Strings - character arrays, string.h functions",
      "Structs - grouping data, arrays of structs",
      "Dynamic Memory - malloc, free, memory leaks",
      "File I/O - fopen, fprintf, fscanf, binary files",
      "Recursion - base case, call stack, examples"
    ],
    Advanced: [
      "Linked Structures in C - nodes, insertion, deletion",
      "Function Pointers - callbacks, qsort comparators",
      "Header Files & Modules - separate compilation, make",
      "Debugging - gdb, valgrind, common bugs",
      "Bit Manipulation - masks, shifts, flags",
      "Undefined Behaviour - buffer overflows, safe coding"
    ]
  },
  "OOP": {
    field: "Computer Science",
    name: "Object-Oriented Programming (Java)",
    desc: "Designing programs with classes and objects, using Java",
    Beginner: [
      "Classes & Objects - fields, methods, constructors",
      "Encapsulation - private fields, getters and setters",
      "Java Basics - types, control flow, Scanner input",
      "Arrays & ArrayList - storing collections of objects",
      "Static vs Instance - class members, utility methods",
      "Strings in Java - immutability, StringBuilder"
    ],
    Intermediate: [
      "Inheritance - extends, super, method overriding",
      "Polymorphism - dynamic dispatch, upcasting",
      "Abstract Classes & Interfaces - contracts, default methods",
      "Exceptions - try/catch/finally, checked vs unchecked",
      "Collections Framework - List, Set, Map, iterators",
      "Generics - type parameters, bounded types"
    ],
    Advanced: [
      "Design Principles - SOLID, composition over inheritance",
      "Design Patterns - Factory, Singleton, Observer, Strategy",
      "UML Class Diagrams - associations, multiplicity",
      "Unit Testing - JUnit, test-driven development",
      "Lambdas & Streams - functional interfaces, map/filter",
      "Concurrency Basics - threads, synchronized, executors"
    ]
  },
  "Discrete Math": {
    field: "Computer Science",
    name: "Discrete Mathematics",
    desc: "The mathematics behind computer science: logic, proofs, sets, counting and graphs",
    Beginner: [
      "Propositional Logic - truth tables, connectives",
      "Predicate Logic - quantifiers, negation",
      "Sets - operations, Venn diagrams, power sets",
      "Functions - injective, surjective, bijective",
      "Number Bases - binary, octal, hexadecimal",
      "Sequences & Sums - arithmetic, geometric, sigma notation"
    ],
    Intermediate: [
      "Proof Techniques - direct, contrapositive, contradiction",
      "Mathematical Induction - weak and strong induction",
      "Relations - equivalence relations, partial orders",
      "Counting - permutations, combinations, pigeonhole",
      "Number Theory - divisibility, gcd, modular arithmetic",
      "Graph Basics - degree, paths, cycles, trees"
    ],
    Advanced: [
      "Recurrence Relations - solving linear recurrences",
      "Inclusion-Exclusion - counting with overlaps",
      "Discrete Probability - events, expectation, Bayes",
      "Graph Theory - Euler and Hamilton paths, colouring",
      "Boolean Algebra - simplification, normal forms",
      "RSA Mathematics - modular inverses, Euler totient"
    ]
  },
  "Computer Architecture": {
    field: "Computer Science",
    name: "Computer Organization & Architecture",
    desc: "How a computer works inside: data representation, the CPU, memory and I/O",
    Beginner: [
      "Data Representation - two's complement, floating point",
      "Logic Gates - AND, OR, NOT, building circuits",
      "Von Neumann Model - CPU, memory, buses",
      "Instruction Cycle - fetch, decode, execute",
      "Assembly Basics - registers, simple instructions",
      "Memory Units - bits, bytes, words, addressing"
    ],
    Intermediate: [
      "Instruction Set Architecture - RISC vs CISC, MIPS/RISC-V",
      "Datapath & Control - single-cycle processor",
      "Pipelining - stages, hazards, forwarding",
      "Memory Hierarchy - registers, cache, RAM, disk",
      "Cache Design - mapping, hit rate, replacement",
      "I/O Systems - interrupts, DMA, polling"
    ],
    Advanced: [
      "Branch Prediction - static and dynamic predictors",
      "Virtual Memory - paging, TLB, page faults",
      "Performance - CPI, Amdahl's law, benchmarks",
      "Multicore - parallelism, cache coherence",
      "Superscalar & Out-of-Order Execution - ILP",
      "GPUs & Accelerators - SIMD, specialised hardware"
    ]
  },
  "Operating Systems": {
    field: "Computer Science",
    name: "Operating Systems",
    desc: "How the OS manages processes, memory, files and devices",
    Beginner: [
      "OS Roles - kernel, user mode, system calls",
      "Processes - states, PCB, creation with fork",
      "Threads - user vs kernel threads",
      "CPU Scheduling Basics - FCFS, SJF, Round Robin",
      "File Systems Basics - files, directories, paths",
      "Shell & Commands - Linux command line essentials"
    ],
    Intermediate: [
      "Synchronization - race conditions, critical sections",
      "Locks & Semaphores - mutex, producer-consumer",
      "Deadlock - conditions, prevention, banker's algorithm",
      "Memory Management - partitioning, paging, segmentation",
      "Virtual Memory - demand paging, page replacement",
      "Inter-Process Communication - pipes, shared memory"
    ],
    Advanced: [
      "Advanced Scheduling - multilevel feedback, real-time",
      "File System Implementation - inodes, journaling",
      "Storage - disk scheduling, RAID, SSDs",
      "Virtualization - hypervisors, containers",
      "OS Security - protection rings, access control",
      "Distributed OS Concepts - clocks, consensus basics"
    ]
  },
  "Databases": {
    field: "Computer Science",
    name: "Database Systems",
    desc: "Designing, querying and managing relational databases",
    Beginner: [
      "Database Concepts - DBMS, tables, keys",
      "ER Modelling - entities, relationships, cardinality",
      "Relational Model - schemas, primary and foreign keys",
      "SQL Basics - SELECT, WHERE, ORDER BY",
      "SQL Data Changes - INSERT, UPDATE, DELETE",
      "Aggregates - COUNT, SUM, GROUP BY, HAVING"
    ],
    Intermediate: [
      "Joins - inner, left, right, self joins",
      "Subqueries & Views - nested queries, CREATE VIEW",
      "Normalization - 1NF, 2NF, 3NF, BCNF",
      "Constraints - NOT NULL, UNIQUE, CHECK, referential integrity",
      "Relational Algebra - selection, projection, join",
      "Indexes - B-trees, when to index"
    ],
    Advanced: [
      "Transactions - ACID properties",
      "Concurrency Control - locking, isolation levels",
      "Recovery - logging, checkpoints",
      "Query Optimization - execution plans, cost",
      "NoSQL Databases - document, key-value, graph",
      "Database Security - SQL injection, privileges"
    ]
  },
  "Computer Networks": {
    field: "Computer Science",
    name: "Computer Networks",
    desc: "How data travels across networks and the Internet, layer by layer",
    Beginner: [
      "Network Basics - LAN, WAN, topologies",
      "OSI & TCP/IP Models - layers and their jobs",
      "Physical Layer - cables, wireless, bandwidth",
      "IP Addressing - IPv4, subnet masks",
      "Network Devices - hubs, switches, routers",
      "Application Protocols - HTTP, DNS, email"
    ],
    Intermediate: [
      "Subnetting - CIDR, calculating subnets",
      "Transport Layer - TCP vs UDP, ports",
      "TCP Reliability - handshake, flow and congestion control",
      "Routing - static routes, distance vector, link state",
      "Data Link Layer - Ethernet, MAC addresses, ARP",
      "Wireless Networks - Wi-Fi standards, access points"
    ],
    Advanced: [
      "IPv6 - addressing, transition methods",
      "Network Security - firewalls, VPNs, TLS",
      "Software-Defined Networking - control and data planes",
      "Routing Protocols - OSPF, BGP",
      "Network Performance - delay, throughput, QoS",
      "Network Troubleshooting - ping, traceroute, Wireshark"
    ]
  },
  "Software Engineering": {
    field: "Computer Science",
    name: "Software Engineering",
    desc: "Building software in teams: requirements, design, testing and process",
    Beginner: [
      "Software Life Cycle - phases from idea to maintenance",
      "Process Models - waterfall, incremental, spiral",
      "Agile & Scrum - sprints, backlog, roles",
      "Requirements - functional vs non-functional, user stories",
      "Version Control - Git, branches, commits",
      "Teamwork - communication, code reviews"
    ],
    Intermediate: [
      "UML Modelling - use case, class, sequence diagrams",
      "Software Design - modularity, coupling, cohesion",
      "Architecture Styles - layered, client-server, MVC",
      "Testing Levels - unit, integration, system, acceptance",
      "Test Design - black-box, white-box, coverage",
      "Project Estimation - effort, story points"
    ],
    Advanced: [
      "Design Patterns in Practice - choosing and applying",
      "Refactoring - code smells, safe changes",
      "CI/CD - automated builds, tests, deployment",
      "Software Quality - metrics, reliability, maintainability",
      "Risk Management - identifying and reducing risks",
      "Professional Ethics - responsibility, licensing"
    ]
  },
  "Theory of Computation": {
    field: "Computer Science",
    name: "Theory of Computation",
    desc: "What computers can and cannot do: automata, languages and complexity",
    Beginner: [
      "Alphabets & Languages - strings, operations",
      "Finite Automata - DFA design",
      "Nondeterminism - NFA, subset construction",
      "Regular Expressions - syntax, equivalence with FA",
      "Regular Language Properties - closure",
      "Pumping Lemma (Regular) - proving non-regularity"
    ],
    Intermediate: [
      "Context-Free Grammars - derivations, parse trees",
      "Pushdown Automata - stack-based machines",
      "Ambiguity - ambiguous grammars, fixes",
      "Chomsky Normal Form - conversion steps",
      "Pumping Lemma (CFL) - limits of CFLs",
      "Turing Machines - definition, examples"
    ],
    Advanced: [
      "Decidability - decidable vs undecidable problems",
      "Halting Problem - diagonalization proof",
      "Reductions - mapping reducibility",
      "Complexity Classes - P and NP",
      "NP-Completeness - SAT, Cook-Levin, reductions",
      "Space Complexity - PSPACE, Savitch's theorem"
    ]
  },
  "Cybersecurity": {
    field: "Computer Science",
    name: "Cybersecurity",
    desc: "Protecting systems, networks and data from attacks",
    Beginner: [
      "Security Principles - confidentiality, integrity, availability",
      "Threats & Attacks - malware, phishing, social engineering",
      "Passwords & Authentication - hashing, MFA",
      "Security Policies - least privilege, defence in depth",
      "Basic Cryptography - symmetric vs asymmetric",
      "Safe Online Practice - updates, backups"
    ],
    Intermediate: [
      "Cryptography - AES, RSA, digital signatures",
      "Network Security - firewalls, IDS, VPN",
      "Web Security - XSS, CSRF, SQL injection",
      "Access Control - DAC, MAC, RBAC",
      "Vulnerability Scanning - tools, CVEs",
      "Security Protocols - TLS, SSH, PKI"
    ],
    Advanced: [
      "Penetration Testing - methodology, ethics",
      "Incident Response - detection, containment, recovery",
      "Digital Forensics - evidence, chain of custody",
      "Secure Software Development - threat modelling, OWASP",
      "Cloud Security - shared responsibility, IAM",
      "Security Law & Ethics - privacy, compliance"
    ]
  },
  "Artificial Intelligence": {
    field: "Computer Science",
    name: "Artificial Intelligence",
    desc: "Making computers search, reason, plan and learn",
    Beginner: [
      "What is AI - history, types of AI",
      "Intelligent Agents - environments, rationality",
      "Uninformed Search - BFS, DFS, uniform cost",
      "Problem Formulation - states, actions, goals",
      "Python for AI - NumPy, simple simulations",
      "AI Ethics Basics - bias, fairness"
    ],
    Intermediate: [
      "Informed Search - heuristics, A*",
      "Adversarial Search - minimax, alpha-beta pruning",
      "Constraint Satisfaction - backtracking, arc consistency",
      "Knowledge Representation - propositional and first-order logic",
      "Probabilistic Reasoning - Bayes nets",
      "Intro to Machine Learning - supervised vs unsupervised"
    ],
    Advanced: [
      "Planning - STRIPS, plan search",
      "Markov Decision Processes - value and policy iteration",
      "Reinforcement Learning - Q-learning",
      "Neural Networks - layers, training, backpropagation",
      "Natural Language Processing - language models",
      "Responsible AI - explainability, safety, regulation"
    ]
  },
  "HCI": {
    field: "Computer Science",
    name: "Human-Computer Interaction",
    desc: "Designing software that people find easy and pleasant to use",
    Beginner: [
      "What is HCI - usability, user experience",
      "Human Factors - perception, memory, attention",
      "Design Principles - visibility, feedback, consistency",
      "User Research - interviews, surveys, personas",
      "Sketching & Wireframes - low-fidelity design",
      "Accessibility Basics - WCAG, inclusive design"
    ],
    Intermediate: [
      "Interaction Design - flows, navigation, forms",
      "Prototyping - paper and interactive prototypes",
      "Usability Testing - tasks, think-aloud",
      "Heuristic Evaluation - Nielsen's heuristics",
      "Visual Design - layout, typography, colour",
      "Information Architecture - menus, labelling"
    ],
    Advanced: [
      "Evaluation Methods - A/B tests, metrics",
      "Mobile & Touch Design - gestures, small screens",
      "Advanced Accessibility - screen readers, ARIA",
      "Designing for Diverse Users - culture, age, ability",
      "Emerging Interfaces - voice, AR/VR",
      "Ethics in Design - dark patterns, privacy"
    ]
  },
  "Parallel Computing": {
    field: "Computer Science",
    name: "Parallel & Distributed Computing",
    desc: "Using many processors and machines to solve problems faster",
    Beginner: [
      "Why Parallelism - limits of single cores",
      "Concurrency vs Parallelism - definitions, examples",
      "Threads - creating and joining",
      "Speedup & Efficiency - Amdahl's and Gustafson's laws",
      "Shared vs Distributed Memory - models",
      "Race Conditions - examples and fixes"
    ],
    Intermediate: [
      "Synchronization - locks, barriers, atomics",
      "OpenMP - parallel loops, reductions",
      "Message Passing - MPI send/receive",
      "Parallel Algorithms - prefix sum, parallel sort",
      "GPU Programming Basics - CUDA kernels",
      "Load Balancing - static and dynamic"
    ],
    Advanced: [
      "Distributed Systems - nodes, failures, latency",
      "Consistency Models - strong, eventual",
      "Consensus - Paxos, Raft basics",
      "MapReduce & Spark - big data processing",
      "Cloud Computing - scaling, containers, Kubernetes",
      "Performance Tuning - profiling, bottlenecks"
    ]
  },
  "Mobile Development": {
    field: "Computer Science",
    name: "Mobile App Development",
    desc: "Building apps for Android and iOS",
    Beginner: [
      "Mobile Platforms - Android vs iOS, app stores",
      "Development Tools - Android Studio, emulators",
      "App Structure - activities, screens, lifecycle",
      "Layouts - views, constraints, responsive screens",
      "User Input - buttons, text fields, events",
      "Navigation - moving between screens"
    ],
    Intermediate: [
      "Lists & Adapters - RecyclerView, scrolling lists",
      "Local Storage - preferences, SQLite, Room",
      "Networking - REST APIs, JSON parsing",
      "Device Features - camera, GPS, sensors",
      "Cross-Platform Frameworks - Flutter, React Native",
      "Permissions - requesting and handling"
    ],
    Advanced: [
      "Architecture - MVVM, repositories",
      "Background Work - services, notifications",
      "Testing Mobile Apps - unit and UI tests",
      "Performance - memory, battery, smooth scrolling",
      "App Security - secure storage, HTTPS",
      "Publishing - signing, store listing, updates"
    ]
  },

  /* ===== Electrical Engineering ===== */
  "Circuit Analysis": {
    field: "Electrical Engineering",
    name: "Electric Circuit Analysis",
    desc: "Analysing DC and AC circuits with resistors, capacitors and inductors",
    Beginner: [
      "Circuit Quantities - voltage, current, power, energy",
      "Ohm's Law - resistance, conductance",
      "Kirchhoff's Laws - KCL and KVL",
      "Series & Parallel Resistors - equivalent resistance",
      "Voltage & Current Dividers - quick analysis",
      "Sources - independent and dependent sources"
    ],
    Intermediate: [
      "Nodal Analysis - node voltages, supernodes",
      "Mesh Analysis - mesh currents, supermeshes",
      "Thevenin & Norton Equivalents - simplifying circuits",
      "Superposition & Source Transformation",
      "Maximum Power Transfer - matching loads",
      "Capacitors & Inductors - energy storage, RC and RL circuits"
    ],
    Advanced: [
      "First-Order Transients - step response of RC/RL",
      "Second-Order Circuits - RLC natural and step response",
      "AC Phasors - impedance, phasor analysis",
      "AC Power - real, reactive, apparent power, power factor",
      "Three-Phase Circuits - star and delta connections",
      "Frequency Response - resonance, filters, Bode plots"
    ]
  },
  "Digital Logic": {
    field: "Electrical Engineering",
    name: "Digital Logic Design",
    desc: "Designing digital circuits from logic gates up to sequential machines",
    Beginner: [
      "Number Systems - binary, hexadecimal, conversions",
      "Binary Arithmetic - addition, two's complement",
      "Logic Gates - truth tables, gate symbols",
      "Boolean Algebra - laws and simplification",
      "Karnaugh Maps - minimizing logic",
      "Canonical Forms - SOP and POS"
    ],
    Intermediate: [
      "Combinational Circuits - adders, subtractors",
      "Multiplexers & Decoders - data selection",
      "Encoders & Comparators - priority, magnitude",
      "Latches & Flip-Flops - SR, D, JK, T",
      "Registers & Counters - shift registers, ripple counters",
      "Timing - propagation delay, clocking"
    ],
    Advanced: [
      "Finite State Machines - Moore and Mealy design",
      "State Minimization - reducing states",
      "Memory - RAM, ROM, PLDs",
      "Hardware Description Languages - Verilog/VHDL basics",
      "FPGA Design - synthesis, implementation",
      "Arithmetic Circuits - fast adders, multipliers"
    ]
  },
  "Electronics": {
    field: "Electrical Engineering",
    name: "Electronic Devices & Circuits",
    desc: "Semiconductor devices and the amplifiers built from them",
    Beginner: [
      "Semiconductors - doping, n-type and p-type",
      "PN Junction Diode - characteristics, models",
      "Diode Circuits - rectifiers, clippers, clampers",
      "Zener Diodes - voltage regulation",
      "Special Diodes - LEDs, photodiodes",
      "Lab Instruments - multimeter, oscilloscope"
    ],
    Intermediate: [
      "BJT - operation, regions, biasing",
      "BJT Amplifiers - common emitter, small-signal model",
      "MOSFET - operation, characteristics",
      "MOSFET Amplifiers - common source, biasing",
      "Operational Amplifiers - inverting, non-inverting",
      "Op-Amp Circuits - summing, integrator, differentiator"
    ],
    Advanced: [
      "Frequency Response of Amplifiers - bandwidth",
      "Multistage Amplifiers - cascading, coupling",
      "Feedback - negative feedback, stability",
      "Oscillators - RC, LC, crystal oscillators",
      "Power Amplifiers - class A, B, AB",
      "Active Filters - low-pass, high-pass, band-pass"
    ]
  },
  "Signals & Systems": {
    field: "Electrical Engineering",
    name: "Signals & Systems",
    desc: "Describing and analysing signals and the systems that process them",
    Beginner: [
      "Signal Types - continuous and discrete",
      "Signal Operations - shifting, scaling, reversal",
      "Basic Signals - step, impulse, exponential, sinusoid",
      "System Properties - linearity, time invariance, causality",
      "Energy & Power Signals - classification",
      "Complex Numbers Review - Euler's formula"
    ],
    Intermediate: [
      "LTI Systems - impulse response",
      "Convolution - continuous and discrete",
      "Fourier Series - periodic signals, spectra",
      "Fourier Transform - properties, common pairs",
      "Frequency Response - magnitude and phase",
      "Sampling - Nyquist theorem, aliasing"
    ],
    Advanced: [
      "Laplace Transform - region of convergence, inverse",
      "Transfer Functions - poles and zeros",
      "Z-Transform - discrete systems",
      "Stability Analysis - BIBO stability",
      "Filtering - ideal and practical filters",
      "Modulation Basics - AM, FM concepts"
    ]
  },
  "Electromagnetics": {
    field: "Electrical Engineering",
    name: "Electromagnetic Fields & Waves",
    desc: "Electric and magnetic fields, Maxwell's equations and wave propagation",
    Beginner: [
      "Vector Analysis - dot, cross product, coordinate systems",
      "Coulomb's Law - electric force and field",
      "Electric Flux & Gauss's Law",
      "Electric Potential - potential difference, energy",
      "Conductors & Dielectrics - polarization",
      "Capacitance - parallel plate, coaxial"
    ],
    Intermediate: [
      "Steady Currents - current density, resistance",
      "Magnetic Fields - Biot-Savart law",
      "Ampere's Law - applications",
      "Magnetic Materials - permeability, hysteresis",
      "Faraday's Law - induction, EMF",
      "Inductance - self and mutual inductance"
    ],
    Advanced: [
      "Maxwell's Equations - integral and differential form",
      "Plane Waves - propagation in media",
      "Reflection & Transmission - at boundaries",
      "Transmission Lines - impedance, standing waves",
      "Smith Chart - impedance matching",
      "Antennas Basics - radiation, gain"
    ]
  },
  "Engineering Mathematics": {
    field: "Electrical Engineering",
    name: "Engineering Mathematics",
    desc: "The maths every electrical engineer uses: calculus, ODEs, linear algebra and complex numbers",
    Beginner: [
      "Calculus Review - derivatives, integrals",
      "Complex Numbers - polar form, phasors",
      "Matrices - operations, determinants",
      "Systems of Linear Equations - Gaussian elimination",
      "Vectors - components, products",
      "Series - Taylor and Maclaurin series"
    ],
    Intermediate: [
      "First-Order ODEs - separable, linear",
      "Second-Order ODEs - homogeneous and particular solutions",
      "Eigenvalues & Eigenvectors",
      "Multivariable Calculus - partial derivatives, gradients",
      "Multiple Integrals - double, triple",
      "Probability & Statistics - distributions, mean, variance"
    ],
    Advanced: [
      "Laplace Transform for ODEs",
      "Fourier Analysis - series and transforms",
      "Vector Calculus - divergence, curl, theorems",
      "Numerical Methods - root finding, integration",
      "Complex Analysis - analytic functions, residues",
      "Partial Differential Equations - wave and heat equations"
    ]
  },
  "Electric Machines": {
    field: "Electrical Engineering",
    name: "Electric Machines",
    desc: "Transformers, motors and generators",
    Beginner: [
      "Magnetic Circuits - flux, reluctance, MMF",
      "Electromechanical Energy Conversion - principles",
      "Single-Phase Transformer - ideal transformer",
      "Transformer Equivalent Circuit - tests",
      "DC Machines - construction, operation",
      "Machine Safety - ratings, nameplates"
    ],
    Intermediate: [
      "Transformer Efficiency & Regulation",
      "Three-Phase Transformers - connections",
      "DC Motors - speed control, characteristics",
      "Induction Motors - principle, slip",
      "Induction Motor Equivalent Circuit - torque-speed curve",
      "Starting Methods - DOL, star-delta, soft start"
    ],
    Advanced: [
      "Synchronous Generators - operation, phasor diagram",
      "Synchronous Motors - power factor correction",
      "Parallel Operation of Generators",
      "Special Machines - stepper, BLDC, servo motors",
      "Variable Frequency Drives - V/f control",
      "Machine Losses & Testing"
    ]
  },
  "Power Systems": {
    field: "Electrical Engineering",
    name: "Power System Analysis",
    desc: "How electricity is generated, transmitted and distributed",
    Beginner: [
      "Power System Structure - generation, transmission, distribution",
      "Single-Line Diagrams - symbols, reading diagrams",
      "Per-Unit System - base values, conversions",
      "Complex Power - three-phase power calculations",
      "Generation Sources - thermal, hydro, nuclear, renewables",
      "Electrical Safety - grounding, protection basics"
    ],
    Intermediate: [
      "Transmission Line Parameters - R, L, C",
      "Transmission Line Models - short, medium, long",
      "Power Flow - bus admittance matrix",
      "Load Flow Methods - Gauss-Seidel, Newton-Raphson",
      "Voltage Control - reactive power compensation",
      "Distribution Systems - feeders, substations"
    ],
    Advanced: [
      "Symmetrical Faults - short-circuit calculations",
      "Symmetrical Components - sequence networks",
      "Unsymmetrical Faults - line-to-ground, line-to-line",
      "Power System Protection - relays, circuit breakers",
      "Power System Stability - swing equation, equal area",
      "Economic Dispatch - optimal generation"
    ]
  },
  "Power Electronics": {
    field: "Electrical Engineering",
    name: "Power Electronics",
    desc: "Switching circuits that convert and control electrical power",
    Beginner: [
      "Power Electronics Overview - applications, efficiency",
      "Power Semiconductor Devices - diodes, thyristors",
      "Power MOSFETs & IGBTs - switching characteristics",
      "Uncontrolled Rectifiers - single and three phase",
      "Switching Losses - conduction and switching",
      "Heat Sinks & Thermal Design"
    ],
    Intermediate: [
      "Controlled Rectifiers - thyristor phase control",
      "DC-DC Converters - buck converter",
      "Boost & Buck-Boost Converters",
      "PWM Techniques - duty cycle control",
      "Inverters - single-phase square wave, PWM",
      "Three-Phase Inverters - sine PWM"
    ],
    Advanced: [
      "Resonant Converters - soft switching",
      "Isolated Converters - flyback, forward",
      "Motor Drives - DC and AC drive control",
      "Power Quality - harmonics, filters, THD",
      "Renewable Energy Converters - solar MPPT, wind",
      "Converter Control - feedback, compensators"
    ]
  },
  "Control Systems": {
    field: "Electrical Engineering",
    name: "Control Systems",
    desc: "Using feedback to make systems behave the way we want",
    Beginner: [
      "Control Concepts - open loop vs closed loop",
      "System Modelling - mechanical and electrical systems",
      "Transfer Functions - from differential equations",
      "Block Diagrams - reduction rules",
      "Signal Flow Graphs - Mason's gain formula",
      "Time Response - first-order systems"
    ],
    Intermediate: [
      "Second-Order Response - overshoot, settling time",
      "Steady-State Error - system type, error constants",
      "Stability - Routh-Hurwitz criterion",
      "Root Locus - sketching and design",
      "PID Control - proportional, integral, derivative",
      "Frequency Response - Bode plots"
    ],
    Advanced: [
      "Nyquist Criterion - stability from frequency response",
      "Gain & Phase Margins - robustness",
      "Compensator Design - lead, lag, lead-lag",
      "State-Space Models - state equations",
      "Controllability & Observability",
      "Digital Control - discretization, z-domain design"
    ]
  },
  "Communication Systems": {
    field: "Electrical Engineering",
    name: "Communication Systems",
    desc: "Sending information through channels using analog and digital modulation",
    Beginner: [
      "Communication System Model - source, channel, receiver",
      "Signals & Spectra - bandwidth",
      "Noise - thermal noise, SNR",
      "Amplitude Modulation - AM, DSB, SSB",
      "Frequency Modulation - FM, bandwidth",
      "Radio Receivers - superheterodyne"
    ],
    Intermediate: [
      "Sampling & Quantization - PCM",
      "Line Coding - NRZ, Manchester",
      "Digital Modulation - ASK, FSK, PSK",
      "QAM - constellations, data rate",
      "Multiplexing - TDM, FDM",
      "Probability of Error - BER"
    ],
    Advanced: [
      "Information Theory - entropy, channel capacity",
      "Channel Coding - Hamming, convolutional codes",
      "OFDM - multicarrier systems",
      "Wireless Channels - fading, multipath",
      "Spread Spectrum & CDMA",
      "Cellular Systems - 4G LTE, 5G concepts"
    ]
  },
  "DSP": {
    field: "Electrical Engineering",
    name: "Digital Signal Processing",
    desc: "Processing sampled signals with algorithms and digital filters",
    Beginner: [
      "Discrete-Time Signals - sequences, operations",
      "Sampling Review - aliasing, reconstruction",
      "Discrete-Time Systems - difference equations",
      "Discrete Convolution - computing outputs",
      "Z-Transform Review - poles, zeros",
      "DSP Tools - MATLAB/Python basics"
    ],
    Intermediate: [
      "DTFT - discrete-time Fourier transform, frequency response",
      "DFT - discrete Fourier transform, properties",
      "FFT - fast Fourier transform, radix-2 algorithm",
      "FIR Filters - windowing design",
      "IIR Filters - bilinear transform",
      "Filter Structures - direct form, cascade"
    ],
    Advanced: [
      "Multirate DSP - decimation, interpolation",
      "Spectral Analysis - windows, resolution",
      "Adaptive Filters - LMS algorithm",
      "Quantization Effects - finite word length",
      "DSP Hardware - DSP processors, real-time",
      "Applications - audio, image, biomedical signals"
    ]
  },
  "Embedded Systems": {
    field: "Electrical Engineering",
    name: "Microcontrollers & Embedded Systems",
    desc: "Programming small computers that control real devices",
    Beginner: [
      "Embedded Systems Overview - examples, constraints",
      "Microcontroller Architecture - CPU, memory, peripherals",
      "Embedded C - registers, bit manipulation",
      "Digital I/O - GPIO, LEDs, buttons",
      "Development Boards - Arduino, STM32, toolchains",
      "Debouncing - reading switches reliably"
    ],
    Intermediate: [
      "Timers & Counters - delays, PWM",
      "Interrupts - ISRs, priorities",
      "ADC & DAC - reading sensors, analog output",
      "Serial Communication - UART",
      "I2C & SPI - connecting peripherals",
      "Driving Actuators - motors, relays"
    ],
    Advanced: [
      "Real-Time Operating Systems - tasks, scheduling",
      "Low-Power Design - sleep modes",
      "Memory & Bootloaders - flash, firmware updates",
      "Embedded Debugging - JTAG, logic analysers",
      "IoT Connectivity - Wi-Fi, BLE, MQTT",
      "Embedded System Design Project - requirements to prototype"
    ]
  },
  "Instrumentation": {
    field: "Electrical Engineering",
    name: "Instrumentation & Measurements",
    desc: "Measuring electrical and physical quantities accurately",
    Beginner: [
      "Measurement Basics - units, standards",
      "Errors - accuracy, precision, resolution",
      "Analog Meters - PMMC, ammeters, voltmeters",
      "Digital Multimeters - operation, use",
      "Oscilloscopes - triggering, measurements",
      "Lab Safety & Good Practice"
    ],
    Intermediate: [
      "Bridges - Wheatstone, AC bridges",
      "Transducers - strain gauges, thermocouples",
      "Sensors - temperature, pressure, light",
      "Signal Conditioning - amplifiers, filters",
      "Data Acquisition - ADC, sampling",
      "Power & Energy Measurement"
    ],
    Advanced: [
      "Instrumentation Amplifiers - CMRR",
      "Noise & Shielding - grounding, interference",
      "Calibration - procedures, traceability",
      "Virtual Instruments - LabVIEW basics",
      "Smart Sensors - digital interfaces",
      "Measurement Uncertainty - statistics, reporting"
    ]
  },
  "Renewable Energy": {
    field: "Electrical Engineering",
    name: "Renewable Energy Systems",
    desc: "Solar, wind and storage, and connecting them to the grid",
    Beginner: [
      "Energy Basics - power, energy, efficiency",
      "Energy Sources - fossil vs renewable",
      "Solar Energy - irradiance, PV cells",
      "Wind Energy - wind power basics",
      "Hydro & Other Renewables - hydro, geothermal, biomass",
      "Sustainability - emissions, climate goals"
    ],
    Intermediate: [
      "PV Systems - modules, arrays, I-V curves",
      "MPPT - maximum power point tracking",
      "Wind Turbines - generators, power curves",
      "Energy Storage - batteries, state of charge",
      "Inverters for Renewables - grid-tied, off-grid",
      "System Sizing - load analysis, design"
    ],
    Advanced: [
      "Grid Integration - standards, power quality",
      "Microgrids - control, islanding",
      "Smart Grids - metering, demand response",
      "Battery Management Systems",
      "Energy Economics - LCOE, payback",
      "Hydrogen & Emerging Technologies"
    ]
  },
  "VLSI": {
    field: "Electrical Engineering",
    name: "VLSI Design",
    desc: "Designing integrated circuits with CMOS transistors",
    Beginner: [
      "IC Overview - Moore's law, design flow",
      "MOS Transistor - structure, operation",
      "CMOS Inverter - characteristics",
      "CMOS Logic Gates - NAND, NOR design",
      "Fabrication Basics - lithography, layers",
      "Layout Basics - design rules"
    ],
    Intermediate: [
      "Delay & Power - RC models, dynamic power",
      "Combinational CMOS Design - sizing",
      "Sequential Circuits - latches, flip-flops in CMOS",
      "Interconnect - wires, parasitics",
      "Memory Design - SRAM, DRAM cells",
      "Verilog for Synthesis"
    ],
    Advanced: [
      "Low-Power Design - clock gating, voltage scaling",
      "Timing Analysis - setup, hold, STA",
      "Physical Design - placement, routing",
      "Design for Testability - scan chains",
      "ASIC vs FPGA - trade-offs",
      "Advanced Nodes - FinFET, scaling limits"
    ]
  },

  /* ===== Business ===== */
  "Financial Accounting": {
    field: "Business",
    name: "Financial Accounting",
    desc: "Recording business transactions and preparing financial statements",
    Beginner: [
      "Accounting Basics - users, principles, the accounting equation",
      "Double-Entry - debits and credits",
      "Journals & Ledgers - recording transactions",
      "Trial Balance - checking accounts",
      "Adjusting Entries - accruals, prepayments",
      "Financial Statements - income statement, balance sheet"
    ],
    Intermediate: [
      "Cash Flow Statement - operating, investing, financing",
      "Inventory - FIFO, weighted average",
      "Receivables - bad debts, allowance method",
      "Fixed Assets - depreciation methods",
      "Liabilities - payables, loans, bonds",
      "Equity - share capital, retained earnings"
    ],
    Advanced: [
      "Financial Ratio Analysis - liquidity, profitability",
      "IFRS & GAAP - standards and differences",
      "Revenue Recognition - five-step model",
      "Consolidation Basics - groups of companies",
      "Ethics in Accounting - fraud, earnings management",
      "Interpreting Annual Reports"
    ]
  },
  "Managerial Accounting": {
    field: "Business",
    name: "Managerial Accounting",
    desc: "Using cost information to plan, control and make decisions",
    Beginner: [
      "Role of Managerial Accounting - vs financial accounting",
      "Cost Concepts - fixed, variable, direct, indirect",
      "Cost Behaviour - mixed costs, high-low method",
      "Cost-Volume-Profit - break-even analysis",
      "Contribution Margin - per unit and ratio",
      "Product Costing Basics - materials, labour, overhead"
    ],
    Intermediate: [
      "Job Order Costing - tracking job costs",
      "Process Costing - equivalent units",
      "Activity-Based Costing - cost drivers",
      "Budgeting - master budget",
      "Flexible Budgets & Variances",
      "Standard Costing - price and quantity variances"
    ],
    Advanced: [
      "Relevant Costing - make or buy, special orders",
      "Capital Budgeting - NPV, IRR, payback",
      "Performance Measurement - ROI, residual income",
      "Balanced Scorecard - financial and non-financial measures",
      "Transfer Pricing - between divisions",
      "Pricing Decisions - cost-plus, target costing"
    ]
  },
  "Microeconomics": {
    field: "Business",
    name: "Microeconomics",
    desc: "How consumers and firms make choices and how markets work",
    Beginner: [
      "Economic Thinking - scarcity, opportunity cost",
      "Demand - law of demand, shifts",
      "Supply - law of supply, shifts",
      "Market Equilibrium - price and quantity",
      "Elasticity - price, income, cross elasticity",
      "Government Intervention - price controls, taxes"
    ],
    Intermediate: [
      "Consumer Choice - utility, budget constraint",
      "Production - short run and long run",
      "Costs of Production - marginal, average costs",
      "Perfect Competition - firm decisions",
      "Monopoly - pricing, deadweight loss",
      "Monopolistic Competition & Oligopoly"
    ],
    Advanced: [
      "Game Theory - Nash equilibrium, strategies",
      "Market Failure - externalities, public goods",
      "Information Problems - adverse selection, moral hazard",
      "Labour Markets - wages, unions",
      "Welfare Economics - efficiency, equity",
      "Behavioural Economics - biases in decisions"
    ]
  },
  "Macroeconomics": {
    field: "Business",
    name: "Macroeconomics",
    desc: "The economy as a whole: output, inflation, unemployment and policy",
    Beginner: [
      "Macroeconomic Goals - growth, stability, jobs",
      "GDP - measuring output",
      "Inflation - CPI, causes, effects",
      "Unemployment - types, measurement",
      "Circular Flow - households, firms, government",
      "Business Cycles - booms and recessions"
    ],
    Intermediate: [
      "Aggregate Demand & Supply",
      "Consumption & Saving - multiplier",
      "Fiscal Policy - government spending, taxes",
      "Money & Banking - money supply, banks",
      "Monetary Policy - central banks, interest rates",
      "Exchange Rates - fixed and floating"
    ],
    Advanced: [
      "Economic Growth Models - Solow model",
      "IS-LM Model - goods and money markets",
      "Phillips Curve - inflation vs unemployment",
      "Open Economy - balance of payments, trade",
      "Government Debt - deficits, sustainability",
      "Global Financial Crises - causes and lessons"
    ]
  },
  "Business Statistics": {
    field: "Business",
    name: "Business Statistics",
    desc: "Using data and statistics to support business decisions",
    Beginner: [
      "Data Types - qualitative, quantitative",
      "Descriptive Statistics - mean, median, mode",
      "Spread - range, variance, standard deviation",
      "Charts - histograms, bar and pie charts",
      "Probability Basics - rules, events",
      "Spreadsheets for Statistics - Excel functions"
    ],
    Intermediate: [
      "Probability Distributions - binomial, Poisson",
      "Normal Distribution - z-scores",
      "Sampling - methods, sampling distributions",
      "Confidence Intervals - means, proportions",
      "Hypothesis Testing - p-values, errors",
      "Chi-Square Tests - independence"
    ],
    Advanced: [
      "Simple Linear Regression - fitting, interpretation",
      "Multiple Regression - several predictors",
      "ANOVA - comparing groups",
      "Time Series Forecasting - trends, seasonality",
      "Quality Control - control charts",
      "Business Analytics - dashboards, data-driven decisions"
    ]
  },
  "Principles of Management": {
    field: "Business",
    name: "Principles of Management",
    desc: "How managers plan, organise, lead and control",
    Beginner: [
      "What Managers Do - roles, skills",
      "History of Management - classical to modern",
      "Business Environment - internal and external",
      "Planning - goals, plans, SMART objectives",
      "Decision Making - rational and bounded",
      "Social Responsibility & Ethics"
    ],
    Intermediate: [
      "Organizing - structure, departments",
      "Organizational Design - centralization, span of control",
      "Leadership Basics - traits, styles",
      "Motivation - Maslow, Herzberg",
      "Communication in Organizations",
      "Control - control process, KPIs"
    ],
    Advanced: [
      "Strategic Planning - SWOT, mission",
      "Managing Change - resistance, models",
      "Teams - building effective teams",
      "Innovation Management",
      "Global Management - culture, cross-border teams",
      "Managing in the Digital Age"
    ]
  },
  "Organizational Behavior": {
    field: "Business",
    name: "Organizational Behavior",
    desc: "How people behave at work, alone and in groups",
    Beginner: [
      "What is OB - levels of analysis",
      "Personality - Big Five, MBTI",
      "Perception - attribution, biases",
      "Attitudes & Job Satisfaction",
      "Values & Diversity at Work",
      "Emotions - emotional intelligence"
    ],
    Intermediate: [
      "Motivation Theories - expectancy, equity, goal setting",
      "Group Behaviour - roles, norms",
      "Teams - team effectiveness",
      "Communication - channels, barriers",
      "Leadership Theories - transformational, situational",
      "Power & Politics - sources of power"
    ],
    Advanced: [
      "Conflict & Negotiation - styles, strategies",
      "Organizational Culture - creating and changing",
      "Stress Management - causes, coping",
      "Organizational Change - Lewin, Kotter",
      "Decision Making in Groups - groupthink",
      "Ethics & Behaviour at Work"
    ]
  },
  "Marketing": {
    field: "Business",
    name: "Principles of Marketing",
    desc: "Understanding customers and creating, pricing, promoting and delivering value",
    Beginner: [
      "What is Marketing - needs, wants, value",
      "Marketing Environment - PESTLE",
      "Consumer Behaviour - buying process",
      "Market Research - surveys, data sources",
      "Segmentation, Targeting & Positioning",
      "Marketing Mix - the 4 Ps"
    ],
    Intermediate: [
      "Product Strategy - product life cycle",
      "Branding - brand equity, identity",
      "Pricing Strategies - cost, value, competition",
      "Distribution - channels, intermediaries",
      "Promotion - advertising, PR, sales promotion",
      "Digital Marketing - SEO, social media, email"
    ],
    Advanced: [
      "Marketing Strategy - growth strategies, Ansoff",
      "Services Marketing - 7 Ps, service quality",
      "B2B Marketing - organisational buying",
      "International Marketing - adapting to markets",
      "Marketing Analytics - metrics, ROI",
      "Ethics in Marketing - honest advertising, privacy"
    ]
  },
  "Corporate Finance": {
    field: "Business",
    name: "Corporate Finance",
    desc: "How companies raise money, invest it and create value",
    Beginner: [
      "Role of Finance - goals of the firm",
      "Financial Statements Review - for finance",
      "Time Value of Money - present and future value",
      "Annuities & Loans - repayment schedules",
      "Interest Rates - nominal, effective",
      "Financial Markets - stocks, bonds, institutions"
    ],
    Intermediate: [
      "Bond Valuation - yields, prices",
      "Stock Valuation - dividend models",
      "Risk & Return - diversification",
      "CAPM - beta, required return",
      "Capital Budgeting - NPV, IRR",
      "Cost of Capital - WACC"
    ],
    Advanced: [
      "Capital Structure - debt vs equity, leverage",
      "Dividend Policy - payout decisions",
      "Working Capital Management - cash, inventory",
      "Mergers & Acquisitions - valuation, synergies",
      "Derivatives & Risk Management - options, futures",
      "International Finance - currency risk"
    ]
  },
  "Operations Management": {
    field: "Business",
    name: "Operations Management",
    desc: "Designing and running the processes that make products and services",
    Beginner: [
      "What is Operations - inputs, transformation, outputs",
      "Productivity - measuring efficiency",
      "Operations Strategy - cost, quality, speed",
      "Process Types - job shop, batch, mass, continuous",
      "Process Mapping - flowcharts",
      "Capacity Basics - utilisation"
    ],
    Intermediate: [
      "Forecasting - moving average, exponential smoothing",
      "Capacity Planning - decisions, bottlenecks",
      "Facility Location & Layout",
      "Inventory Management - EOQ, reorder point",
      "Quality Management - TQM, cost of quality",
      "Scheduling - sequencing rules"
    ],
    Advanced: [
      "Lean Operations - waste, JIT, kanban",
      "Six Sigma - DMAIC, process capability",
      "Project Management - CPM, PERT",
      "MRP & ERP - planning materials",
      "Service Operations - queues, service design",
      "Sustainable Operations - green practices"
    ]
  },
  "Business Law & Ethics": {
    field: "Business",
    name: "Business Law & Ethics",
    desc: "The legal rules and ethical standards that apply to business",
    Beginner: [
      "Legal System - sources of law, courts",
      "Business Ethics - ethical theories",
      "Contracts - offer, acceptance, consideration",
      "Contract Terms - express and implied",
      "Torts - negligence, liability",
      "Corporate Social Responsibility"
    ],
    Intermediate: [
      "Breach of Contract - remedies",
      "Business Organizations - sole trader, partnership, company",
      "Agency - agents and principals",
      "Employment Law - rights, discrimination",
      "Consumer Protection - product liability",
      "Intellectual Property - patents, trademarks, copyright"
    ],
    Advanced: [
      "Company Law - directors' duties, governance",
      "Competition Law - monopolies, cartels",
      "Data Protection - privacy laws, GDPR",
      "International Business Law - trade, disputes",
      "Ethical Decision-Making Frameworks",
      "Whistleblowing & Compliance Programs"
    ]
  },
  "MIS": {
    field: "Business",
    name: "Management Information Systems",
    desc: "How organisations use information technology to run and compete",
    Beginner: [
      "Information Systems Basics - data, information, knowledge",
      "Components of IS - hardware, software, people",
      "Types of Information Systems - TPS, MIS, DSS",
      "Business Processes - process improvement",
      "IT Infrastructure - cloud, networks",
      "Spreadsheets & Databases for Business"
    ],
    Intermediate: [
      "Enterprise Systems - ERP, CRM, SCM",
      "E-Commerce - business models",
      "Business Intelligence - data warehouses, dashboards",
      "Systems Development - SDLC, agile",
      "IS Security - threats, controls",
      "IT Strategy - competitive advantage"
    ],
    Advanced: [
      "Data Analytics & Big Data",
      "Digital Transformation",
      "IT Project Management",
      "IT Governance - COBIT, alignment",
      "Emerging Technologies - AI, blockchain, IoT",
      "Ethics & Privacy in IS"
    ]
  },
  "Human Resource Management": {
    field: "Business",
    name: "Human Resource Management",
    desc: "Attracting, developing and keeping the right people",
    Beginner: [
      "Role of HRM - strategic and operational",
      "Job Analysis - descriptions, specifications",
      "Human Resource Planning - forecasting needs",
      "Recruitment - sources, methods",
      "Selection - interviews, tests",
      "Onboarding - induction programs"
    ],
    Intermediate: [
      "Training & Development - needs analysis, methods",
      "Performance Management - appraisals, feedback",
      "Compensation - pay structures",
      "Benefits & Rewards - incentives",
      "Employee Relations - unions, grievances",
      "Health & Safety at Work"
    ],
    Advanced: [
      "Strategic HRM - aligning with business strategy",
      "Talent Management - succession planning",
      "International HRM - expatriates, global teams",
      "HR Analytics - metrics, data",
      "Diversity, Equity & Inclusion",
      "Employment Law in Practice"
    ]
  },
  "Strategic Management": {
    field: "Business",
    name: "Strategic Management",
    desc: "How firms set direction and build lasting competitive advantage",
    Beginner: [
      "What is Strategy - vision, mission, goals",
      "External Analysis - PESTLE",
      "Industry Analysis - Porter's five forces",
      "Internal Analysis - resources, capabilities",
      "SWOT Analysis - combining internal and external",
      "Value Chain Analysis"
    ],
    Intermediate: [
      "Competitive Advantage - VRIO framework",
      "Generic Strategies - cost leadership, differentiation, focus",
      "Business-Level Strategy - choosing a position",
      "Corporate Strategy - diversification",
      "Growth Strategies - mergers, alliances, organic growth",
      "International Strategy - entry modes"
    ],
    Advanced: [
      "Strategy Implementation - structure, resources",
      "Strategic Control - balanced scorecard",
      "Corporate Governance - boards, stakeholders",
      "Innovation & Disruption - disruptive technologies",
      "Blue Ocean Strategy",
      "Case Analysis - applying frameworks"
    ]
  },
  "Entrepreneurship": {
    field: "Business",
    name: "Entrepreneurship",
    desc: "Turning an idea into a new business",
    Beginner: [
      "Entrepreneurial Mindset - traits, motivation",
      "Idea Generation - problems and opportunities",
      "Opportunity Evaluation - feasibility",
      "Customer Discovery - interviews, validation",
      "Business Model Canvas",
      "Value Proposition Design"
    ],
    Intermediate: [
      "Lean Startup - MVP, build-measure-learn",
      "Market Analysis - size, competitors",
      "Business Plans - structure, writing",
      "Startup Finance - costs, break-even",
      "Marketing a Startup - early customers",
      "Legal Setup - business structures, IP"
    ],
    Advanced: [
      "Funding - bootstrapping, angels, venture capital",
      "Pitching - pitch decks, investors",
      "Scaling - growth challenges",
      "Building a Team - hiring, culture",
      "Social Entrepreneurship",
      "Exit Strategies - acquisition, IPO"
    ]
  },
  "International Business": {
    field: "Business",
    name: "International Business",
    desc: "Doing business across countries, cultures and currencies",
    Beginner: [
      "Globalization - drivers and debates",
      "Culture & Business - Hofstede's dimensions",
      "Political & Legal Systems - country risk",
      "Economic Systems - market, command, mixed",
      "International Trade Basics - imports, exports",
      "Trade Theory - comparative advantage"
    ],
    Intermediate: [
      "Trade Policy - tariffs, quotas",
      "Regional Integration - EU, ASEAN, trade blocs",
      "Foreign Direct Investment - types, motives",
      "Foreign Exchange Market - exchange rates",
      "International Monetary System - IMF, World Bank",
      "Entry Modes - exporting, licensing, joint ventures"
    ],
    Advanced: [
      "Global Strategy - global vs local",
      "International Marketing - adaptation",
      "Global Supply Chains - sourcing",
      "International HRM - managing abroad",
      "Ethics in International Business - corruption, labour",
      "Emerging Markets - opportunities and risks"
    ]
  },
  "Supply Chain Management": {
    field: "Business",
    name: "Supply Chain Management",
    desc: "Managing the flow of goods from suppliers to customers",
    Beginner: [
      "Supply Chain Basics - flows, stages",
      "Supply Chain Strategy - efficiency vs responsiveness",
      "Procurement - purchasing process",
      "Supplier Selection - criteria, evaluation",
      "Logistics Basics - transport modes",
      "Warehousing - functions, layout"
    ],
    Intermediate: [
      "Demand Planning - forecasting in supply chains",
      "Inventory in Supply Chains - safety stock",
      "Bullwhip Effect - causes, solutions",
      "Distribution Network Design",
      "Transportation Management - routing, costs",
      "Supply Chain Performance - KPIs"
    ],
    Advanced: [
      "Supply Chain Risk - disruptions, resilience",
      "Global Sourcing - offshoring, nearshoring",
      "Supply Chain Technology - ERP, RFID, tracking",
      "Sustainable Supply Chains - green logistics",
      "Supply Chain Collaboration - CPFR, partnerships",
      "Supply Chain Analytics - optimization"
    ]
  }
};
