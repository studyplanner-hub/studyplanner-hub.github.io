/* Ready-made subjects for Study Plans and the Subjects page, organised the
   way a university is: college -> department -> subject.

   Each subject has topics at three levels; a study plan spreads the chosen
   level's topics over the days you pick. A topic is "Name - details".
   The lists follow typical university programmes (ACM/IEEE CS2023 for
   Computer Science; common engineering, IT and business cores).
   Needs: nothing. */
'use strict';

const COLLEGES = [
  { name: "College of Engineering", short: "Engineering",
    departments: ["Engineering Core", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Computer Engineering"] },
  { name: "College of Computer Science", short: "Computer Science",
    departments: ["Computer Science", "Software Engineering", "Artificial Intelligence", "Cybersecurity"] },
  { name: "College of Information Technology", short: "Information Technology",
    departments: ["Networks & Systems", "Web & Mobile", "Information Systems"] },
  { name: "College of Business", short: "Business",
    departments: ["Accounting & Finance", "Economics", "Management", "Marketing", "Information Systems"] }
];

const BUILTIN = {

  /* ===== College of Engineering / Engineering Core ===== */
  "Engineering Mathematics": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Mathematics",
    desc: "The maths every engineer uses: calculus, ODEs, linear algebra and complex numbers",
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
  "Engineering Drawing": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Drawing & CAD",
    desc: "Technical drawing by hand and with CAD software",
    Beginner: [
      "Drawing Instruments & Standards - lines, lettering, scales",
      "Geometric Construction - arcs, tangents, polygons",
      "Orthographic Projection - front, top, side views",
      "Isometric Drawing - 3D sketches",
      "Dimensioning - rules and placement",
      "Sectional Views - full and half sections"
    ],
    Intermediate: [
      "CAD Basics - AutoCAD interface, commands",
      "2D CAD Drafting - layers, blocks, annotations",
      "Auxiliary Views - inclined surfaces",
      "Tolerances & Fits - limits, GD&T basics",
      "Assembly Drawings - parts lists, balloons",
      "Reading Engineering Drawings"
    ],
    Advanced: [
      "3D Solid Modelling - SolidWorks/Inventor parts",
      "3D Assemblies - mates, constraints",
      "Drawings from 3D Models - views and details",
      "Sheet Metal & Weldment Drawings",
      "Rendering & Presentation",
      "CAD Standards & File Management"
    ]
  },
  "Statics": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Mechanics: Statics",
    desc: "Forces and moments on bodies at rest",
    Beginner: [
      "Units & Vectors - SI units, vector operations",
      "Force Systems - resultants in 2D",
      "Particle Equilibrium - free-body diagrams",
      "Moments - moment of a force, couples",
      "Force Systems in 3D",
      "Equivalent Systems - reducing force systems"
    ],
    Intermediate: [
      "Rigid Body Equilibrium - 2D supports and reactions",
      "Rigid Body Equilibrium in 3D",
      "Trusses - method of joints",
      "Trusses - method of sections",
      "Frames & Machines",
      "Centroids & Centre of Gravity"
    ],
    Advanced: [
      "Distributed Loads - beams, hydrostatics",
      "Internal Forces - shear and moment diagrams",
      "Friction - dry friction, wedges",
      "Moments of Inertia - parallel axis theorem",
      "Virtual Work",
      "Cables - parabolic and catenary"
    ]
  },
  "Dynamics": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Mechanics: Dynamics",
    desc: "Motion of particles and rigid bodies and the forces that cause it",
    Beginner: [
      "Rectilinear Motion - position, velocity, acceleration",
      "Curvilinear Motion - x-y coordinates",
      "Projectile Motion",
      "Normal & Tangential Components",
      "Relative Motion - translating axes",
      "Newton's Second Law for Particles"
    ],
    Intermediate: [
      "Work & Energy - kinetic energy, power",
      "Conservation of Energy",
      "Impulse & Momentum - linear momentum",
      "Impact - coefficient of restitution",
      "Rigid Body Kinematics - rotation about a fixed axis",
      "General Plane Motion - instantaneous centre"
    ],
    Advanced: [
      "Rigid Body Kinetics - equations of motion",
      "Energy Methods for Rigid Bodies",
      "Angular Momentum",
      "Three-Dimensional Kinematics",
      "Introduction to Vibrations",
      "Dynamics Problem Solving with Software"
    ]
  },
  "Thermodynamics": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Thermodynamics",
    desc: "Energy, heat, work and how engines and refrigerators use them",
    Beginner: [
      "Basic Concepts - systems, properties, states",
      "Energy & Energy Transfer - heat and work",
      "Pure Substances - phase diagrams, property tables",
      "Ideal Gas Law",
      "First Law for Closed Systems",
      "Specific Heats - Cp and Cv"
    ],
    Intermediate: [
      "First Law for Control Volumes - nozzles, turbines",
      "Second Law - Kelvin-Planck, Clausius statements",
      "Carnot Cycle - efficiency limits",
      "Entropy - entropy change, increase principle",
      "Isentropic Processes & Efficiencies",
      "Exergy - availability, irreversibility"
    ],
    Advanced: [
      "Gas Power Cycles - Otto, Diesel, Brayton",
      "Vapour Power Cycles - Rankine cycle",
      "Refrigeration Cycles - vapour compression, COP",
      "Gas Mixtures & Psychrometrics",
      "Combustion - fuels, air-fuel ratio",
      "Thermodynamic Property Relations"
    ]
  },
  "Strength of Materials": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Strength of Materials",
    desc: "How beams, shafts and columns carry load without failing",
    Beginner: [
      "Stress - normal and shear stress",
      "Strain - normal and shear strain",
      "Stress-Strain Diagram - elastic, plastic regions",
      "Hooke's Law & Poisson's Ratio",
      "Axial Loading - deformation of bars",
      "Factor of Safety - allowable stress"
    ],
    Intermediate: [
      "Thermal Stress",
      "Torsion - shafts, angle of twist",
      "Shear & Moment Diagrams",
      "Bending Stress in Beams",
      "Shear Stress in Beams",
      "Combined Loading"
    ],
    Advanced: [
      "Stress Transformation - Mohr's circle",
      "Beam Deflection - integration, superposition",
      "Statically Indeterminate Beams",
      "Column Buckling - Euler formula",
      "Energy Methods - strain energy",
      "Failure Theories - von Mises, Tresca"
    ]
  },
  "Materials Science": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Materials Science & Engineering",
    desc: "Why materials behave as they do, from atoms to applications",
    Beginner: [
      "Material Classes - metals, ceramics, polymers, composites",
      "Atomic Bonding",
      "Crystal Structures - FCC, BCC, HCP",
      "Crystal Defects - vacancies, dislocations",
      "Mechanical Properties - tensile test",
      "Hardness & Toughness Tests"
    ],
    Intermediate: [
      "Diffusion - Fick's laws",
      "Phase Diagrams - binary systems",
      "Iron-Carbon Diagram - steels and cast irons",
      "Heat Treatment - annealing, quenching, tempering",
      "Strengthening Mechanisms",
      "Failure - fracture, fatigue, creep"
    ],
    Advanced: [
      "Corrosion & Degradation",
      "Polymers - structure and properties",
      "Ceramics & Glasses",
      "Composite Materials",
      "Electrical & Magnetic Properties",
      "Materials Selection - Ashby charts"
    ]
  },
  "Engineering Economics": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Economics",
    desc: "Comparing engineering options in money and time",
    Beginner: [
      "Role of Economics in Engineering Decisions",
      "Cost Concepts - fixed, variable, sunk costs",
      "Interest - simple and compound",
      "Cash Flow Diagrams",
      "Time Value of Money - P, F, A factors",
      "Nominal & Effective Interest Rates"
    ],
    Intermediate: [
      "Present Worth Analysis",
      "Annual Worth Analysis",
      "Rate of Return - IRR",
      "Benefit-Cost Ratio",
      "Payback Period",
      "Comparing Alternatives - mutually exclusive projects"
    ],
    Advanced: [
      "Depreciation - straight line, MACRS",
      "Taxes & After-Tax Cash Flows",
      "Replacement Analysis",
      "Inflation",
      "Sensitivity & Break-Even Analysis",
      "Decisions Under Risk - expected value"
    ]
  },
  "Engineering Project Management": {
    college: "College of Engineering",
    department: "Engineering Core",
    name: "Engineering Project Management",
    desc: "Planning and running engineering projects on time and budget",
    Beginner: [
      "What is a Project - scope, time, cost",
      "Project Life Cycle",
      "Stakeholders & Communication",
      "Engineering Teamwork",
      "Project Charter",
      "Engineering Ethics & Codes of Conduct"
    ],
    Intermediate: [
      "Work Breakdown Structure",
      "Scheduling - Gantt charts",
      "Critical Path Method",
      "Cost Estimating & Budgeting",
      "Risk Management",
      "Quality Management"
    ],
    Advanced: [
      "Earned Value Management",
      "Resource Levelling",
      "Procurement & Contracts",
      "Agile in Engineering Projects",
      "Project Software - MS Project, Primavera",
      "Project Closure & Lessons Learned"
    ]
  },

  /* ===== College of Engineering / Electrical Engineering ===== */
  "Circuit Analysis": {
    college: "College of Engineering",
    department: "Electrical Engineering",
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
  "Electronics": {
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
  "Electric Machines": {
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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
  "Instrumentation": {
    college: "College of Engineering",
    department: "Electrical Engineering",
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
    college: "College of Engineering",
    department: "Electrical Engineering",
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

  /* ===== College of Engineering / Mechanical Engineering ===== */
  "Fluid Mechanics": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Fluid Mechanics",
    desc: "How liquids and gases behave at rest and in motion",
    Beginner: [
      "Fluid Properties - density, viscosity",
      "Pressure & Manometers",
      "Hydrostatic Forces on Surfaces",
      "Buoyancy & Stability",
      "Fluid Kinematics - streamlines",
      "Continuity Equation"
    ],
    Intermediate: [
      "Bernoulli Equation - applications",
      "Momentum Equation - forces on bends, jets",
      "Dimensional Analysis - Buckingham Pi",
      "Pipe Flow - laminar and turbulent",
      "Major & Minor Losses - Moody chart",
      "Pumps - pump curves, system curves"
    ],
    Advanced: [
      "Boundary Layers",
      "Drag & Lift",
      "Compressible Flow Basics",
      "Open Channel Flow",
      "Turbomachinery",
      "Introduction to CFD"
    ]
  },
  "Heat Transfer": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Heat Transfer",
    desc: "Conduction, convection and radiation in engineering systems",
    Beginner: [
      "Modes of Heat Transfer",
      "Fourier's Law - conduction",
      "Thermal Resistance - plane walls",
      "Cylinders & Spheres - radial conduction",
      "Critical Insulation Thickness",
      "Convection Basics - Newton's law of cooling"
    ],
    Intermediate: [
      "Fins - extended surfaces",
      "Transient Conduction - lumped capacitance",
      "Forced Convection - external flow",
      "Forced Convection - internal flow",
      "Natural Convection",
      "Boiling & Condensation"
    ],
    Advanced: [
      "Heat Exchangers - LMTD method",
      "Heat Exchangers - effectiveness-NTU",
      "Radiation - blackbody, emissivity",
      "Radiation Exchange - view factors",
      "Numerical Methods in Conduction",
      "Electronics Cooling Applications"
    ]
  },
  "Machine Design": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Machine Design",
    desc: "Designing machine parts that are safe, reliable and economical",
    Beginner: [
      "Design Process - requirements to concept",
      "Materials for Machine Parts",
      "Static Failure Theories",
      "Stress Concentration",
      "Tolerances & Fits",
      "Design Codes & Standards"
    ],
    Intermediate: [
      "Fatigue - S-N curves, endurance limit",
      "Shafts - design for strength",
      "Keys & Couplings",
      "Screws & Fasteners - bolted joints",
      "Welded Joints",
      "Springs - helical springs"
    ],
    Advanced: [
      "Rolling Bearings - selection, life",
      "Journal Bearings - lubrication",
      "Gears - spur gear design",
      "Helical, Bevel & Worm Gears",
      "Belts, Chains & Clutches",
      "Design Project - complete machine assembly"
    ]
  },
  "Manufacturing Processes": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Manufacturing Processes",
    desc: "How parts are made: casting, forming, machining and joining",
    Beginner: [
      "Manufacturing Overview - process families",
      "Engineering Materials for Manufacturing",
      "Measurement & Inspection - calipers, micrometers",
      "Workshop Safety",
      "Casting Basics - sand casting",
      "Metal Forming Basics - forging, rolling"
    ],
    Intermediate: [
      "Sheet Metal Forming - bending, drawing",
      "Machining - turning, milling, drilling",
      "Cutting Tools & Tool Wear",
      "Welding Processes - arc, MIG, TIG",
      "Polymer Processing - injection moulding",
      "Powder Metallurgy"
    ],
    Advanced: [
      "CNC Machining & G-code",
      "Additive Manufacturing - 3D printing",
      "Non-Traditional Machining - EDM, laser",
      "Surface Finishing & Coatings",
      "Quality Control in Manufacturing",
      "Automation & Industry 4.0"
    ]
  },
  "Vibrations": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Mechanical Vibrations",
    desc: "Analysing and controlling vibration in machines and structures",
    Beginner: [
      "Vibration Basics - period, frequency, amplitude",
      "Simple Harmonic Motion",
      "Spring-Mass Systems - natural frequency",
      "Equivalent Stiffness & Mass",
      "Free Undamped Vibration",
      "Energy Method"
    ],
    Intermediate: [
      "Damped Free Vibration - damping ratio",
      "Logarithmic Decrement",
      "Forced Vibration - resonance",
      "Base Excitation & Transmissibility",
      "Rotating Unbalance",
      "Vibration Isolation"
    ],
    Advanced: [
      "Two-Degree-of-Freedom Systems",
      "Multi-DOF Systems - modes",
      "Vibration Absorbers",
      "Continuous Systems - strings, beams",
      "Vibration Measurement - sensors",
      "Condition Monitoring"
    ]
  },
  "HVAC": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Refrigeration & Air Conditioning",
    desc: "Cooling, heating and ventilation of buildings and systems",
    Beginner: [
      "HVAC Overview - applications",
      "Refrigerants - properties, environment",
      "Vapour Compression Cycle Review",
      "Psychrometrics - humid air",
      "Psychrometric Chart",
      "Thermal Comfort"
    ],
    Intermediate: [
      "Cooling Load Calculation",
      "Heating Load Calculation",
      "Air Conditioning Processes",
      "Duct Design",
      "Compressors, Condensers & Evaporators",
      "Expansion Devices"
    ],
    Advanced: [
      "Chillers & Central Systems",
      "Heat Pumps",
      "Ventilation & Indoor Air Quality",
      "HVAC Controls",
      "Energy-Efficient HVAC Design",
      "HVAC Design Project"
    ]
  },
  "Mechatronics": {
    college: "College of Engineering",
    department: "Mechanical Engineering",
    name: "Mechatronics",
    desc: "Combining mechanics, electronics and software in smart machines",
    Beginner: [
      "What is Mechatronics",
      "Sensors - position, speed, force",
      "Actuators - DC motors, solenoids",
      "Basic Electronics for Mechatronics",
      "Microcontrollers in Mechatronics",
      "Signal Conditioning"
    ],
    Intermediate: [
      "Stepper & Servo Motors",
      "Pneumatics & Hydraulics",
      "PLCs - ladder logic",
      "Feedback Control - PID",
      "Data Acquisition",
      "Mechatronic System Modelling"
    ],
    Advanced: [
      "Robotics Basics - kinematics",
      "Motion Control",
      "Machine Vision Basics",
      "Industrial Communication - Modbus, fieldbus",
      "Mechatronic Design Process",
      "Mechatronics Project"
    ]
  },

  /* ===== College of Engineering / Civil Engineering ===== */
  "Surveying": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Surveying",
    desc: "Measuring land and positioning structures accurately",
    Beginner: [
      "Introduction to Surveying - types, units",
      "Distance Measurement - taping, EDM",
      "Levelling - differential levelling",
      "Angles & Directions - bearings",
      "Survey Errors - sources and corrections",
      "Field Notes & Safety"
    ],
    Intermediate: [
      "Theodolite & Total Station",
      "Traversing - computations",
      "Area & Volume Calculations",
      "Contours & Topographic Maps",
      "Horizontal Curves",
      "Vertical Curves"
    ],
    Advanced: [
      "GPS/GNSS Surveying",
      "Construction Setting Out",
      "Photogrammetry & Drones",
      "GIS Basics",
      "Cadastral Surveying",
      "Survey Adjustment - least squares"
    ]
  },
  "Structural Analysis": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Structural Analysis",
    desc: "Finding forces and deflections in beams, trusses and frames",
    Beginner: [
      "Structural Forms & Loads - dead, live, wind",
      "Load Paths",
      "Supports & Reactions",
      "Determinacy & Stability",
      "Statically Determinate Trusses",
      "Shear & Moment in Beams"
    ],
    Intermediate: [
      "Influence Lines",
      "Deflection - double integration",
      "Deflection - virtual work",
      "Moment-Area Method",
      "Cables & Arches",
      "Approximate Analysis of Frames"
    ],
    Advanced: [
      "Force Method - indeterminate structures",
      "Slope-Deflection Method",
      "Moment Distribution",
      "Stiffness Matrix Method",
      "Structural Analysis Software",
      "Introduction to Earthquake Loads"
    ]
  },
  "Concrete Design": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Reinforced Concrete Design",
    desc: "Designing concrete beams, slabs and columns to code",
    Beginner: [
      "Concrete Materials - cement, aggregates, mix",
      "Properties of Concrete & Steel",
      "Design Codes - ACI/Eurocode basics",
      "Limit State Design Concepts",
      "Loads & Load Combinations",
      "Behaviour of RC Beams"
    ],
    Intermediate: [
      "Flexural Design - singly reinforced beams",
      "Doubly Reinforced & T-Beams",
      "Shear Design - stirrups",
      "Bond & Development Length",
      "One-Way Slabs",
      "Serviceability - deflection, cracking"
    ],
    Advanced: [
      "Two-Way Slabs",
      "Short Columns - axial and bending",
      "Slender Columns",
      "Footings - isolated and combined",
      "Retaining Walls",
      "Introduction to Prestressed Concrete"
    ]
  },
  "Geotechnical Engineering": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Geotechnical Engineering",
    desc: "Soil behaviour and the foundations that rest on it",
    Beginner: [
      "Soil Formation & Types",
      "Phase Relationships - void ratio, water content",
      "Grain Size Analysis",
      "Atterberg Limits",
      "Soil Classification - USCS",
      "Soil Compaction"
    ],
    Intermediate: [
      "Permeability & Seepage",
      "Effective Stress",
      "Stress Distribution in Soil",
      "Consolidation - settlement",
      "Shear Strength - Mohr-Coulomb",
      "Site Investigation & Testing"
    ],
    Advanced: [
      "Lateral Earth Pressure",
      "Shallow Foundations - bearing capacity",
      "Deep Foundations - piles",
      "Slope Stability",
      "Retaining Structures",
      "Ground Improvement"
    ]
  },
  "Water Resources": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Hydraulics & Water Resources",
    desc: "Water flow, supply and management for communities",
    Beginner: [
      "Hydrologic Cycle",
      "Precipitation & Runoff",
      "Hydraulic Properties of Water",
      "Pipe Flow Review",
      "Open Channel Basics",
      "Water Demand"
    ],
    Intermediate: [
      "Pipe Networks - Hardy Cross",
      "Pumps & Pumping Stations",
      "Uniform Flow - Manning equation",
      "Hydrographs",
      "Groundwater Flow",
      "Water Treatment Basics"
    ],
    Advanced: [
      "Flood Routing",
      "Stormwater Drainage Design",
      "Dams & Reservoirs",
      "Wastewater Collection & Treatment",
      "Water Distribution Design",
      "Climate & Water Resource Planning"
    ]
  },
  "Transportation Engineering": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Transportation Engineering",
    desc: "Planning and designing roads and traffic systems",
    Beginner: [
      "Transportation Systems Overview",
      "Road User & Vehicle Characteristics",
      "Traffic Flow Basics - speed, flow, density",
      "Traffic Studies - counts, speed studies",
      "Road Classification",
      "Road Safety Basics"
    ],
    Intermediate: [
      "Geometric Design - sight distance",
      "Horizontal & Vertical Alignment",
      "Intersections - design and control",
      "Traffic Signals - timing",
      "Capacity & Level of Service",
      "Parking Design"
    ],
    Advanced: [
      "Pavement Materials",
      "Flexible Pavement Design",
      "Rigid Pavement Design",
      "Transportation Planning - four-step model",
      "Public Transport Systems",
      "Intelligent Transportation Systems"
    ]
  },
  "Construction Management": {
    college: "College of Engineering",
    department: "Civil Engineering",
    name: "Construction Management",
    desc: "Running construction projects: cost, time, quality and safety",
    Beginner: [
      "Construction Industry Overview",
      "Project Participants - owner, contractor, consultant",
      "Project Delivery Methods",
      "Construction Documents - drawings, specs",
      "Construction Safety",
      "Construction Equipment Basics"
    ],
    Intermediate: [
      "Quantity Surveying - take-off",
      "Cost Estimating",
      "Planning & Scheduling - CPM",
      "Bidding & Tendering",
      "Construction Contracts",
      "Site Organisation"
    ],
    Advanced: [
      "Project Control - cost and schedule",
      "Claims & Disputes",
      "Quality Management on Site",
      "Lean Construction",
      "BIM in Construction",
      "Sustainable Construction"
    ]
  },

  /* ===== College of Engineering / Computer Engineering ===== */
  "Digital Logic": {
    college: "College of Engineering",
    department: "Computer Engineering",
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
  "Embedded Systems": {
    college: "College of Engineering",
    department: "Computer Engineering",
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
  "VLSI": {
    college: "College of Engineering",
    department: "Computer Engineering",
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
  "Microprocessors": {
    college: "College of Engineering",
    department: "Computer Engineering",
    name: "Microprocessors & Interfacing",
    desc: "How microprocessors work and how to connect them to the outside world",
    Beginner: [
      "Microprocessor Overview - history, families",
      "Microprocessor Architecture - registers, ALU, buses",
      "Number Systems Review",
      "Memory Organisation",
      "Instruction Set Basics",
      "Assembly Language - first programs"
    ],
    Intermediate: [
      "Addressing Modes",
      "Arithmetic & Logic Instructions",
      "Branching & Loops in Assembly",
      "Stack & Subroutines",
      "Interrupts",
      "Memory Interfacing - address decoding"
    ],
    Advanced: [
      "I/O Interfacing - ports, PPI",
      "Timers & Counters",
      "Serial Interfaces",
      "DMA",
      "ADC/DAC Interfacing",
      "Microprocessor System Design Project"
    ]
  },
  "Internet of Things": {
    college: "College of Engineering",
    department: "Computer Engineering",
    name: "Internet of Things",
    desc: "Connecting sensors and devices to the internet and the cloud",
    Beginner: [
      "What is IoT - applications",
      "IoT Architecture - device, gateway, cloud",
      "Sensors & Actuators",
      "IoT Boards - ESP32, Raspberry Pi",
      "Basic Networking for IoT",
      "Reading a Sensor & Sending Data"
    ],
    Intermediate: [
      "Wireless Protocols - Wi-Fi, BLE, LoRa, Zigbee",
      "Messaging - MQTT, HTTP, CoAP",
      "IoT Cloud Platforms",
      "Data Storage & Dashboards",
      "Power Management for IoT",
      "Edge Computing"
    ],
    Advanced: [
      "IoT Security",
      "Over-the-Air Updates",
      "IoT Data Analytics",
      "Industrial IoT",
      "Smart Home & Smart City Systems",
      "IoT Product Design Project"
    ]
  },
  "Real-Time Systems": {
    college: "College of Engineering",
    department: "Computer Engineering",
    name: "Real-Time Systems",
    desc: "Systems that must respond correctly and on time",
    Beginner: [
      "Real-Time Concepts - hard vs soft deadlines",
      "Examples - cars, medical, aviation",
      "Tasks & Timing Requirements",
      "Cyclic Executives",
      "Interrupt Handling",
      "Timing Measurement"
    ],
    Intermediate: [
      "Real-Time Scheduling - rate monotonic",
      "Earliest Deadline First",
      "Schedulability Analysis",
      "RTOS Concepts - tasks, queues",
      "Priority Inversion & Protocols",
      "Resource Sharing"
    ],
    Advanced: [
      "Worst-Case Execution Time",
      "Multicore Real-Time Systems",
      "Real-Time Communication - CAN bus",
      "Fault Tolerance",
      "Safety Standards - ISO 26262 basics",
      "Real-Time System Design Project"
    ]
  },

  /* ===== College of Computer Science / Computer Science ===== */
  "DSA": {
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
  "Programming Fundamentals": {
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
    college: "College of Computer Science",
    department: "Computer Science",
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
  "Theory of Computation": {
    college: "College of Computer Science",
    department: "Computer Science",
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
  "Parallel Computing": {
    college: "College of Computer Science",
    department: "Computer Science",
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

  /* ===== College of Computer Science / Software Engineering ===== */
  "Software Engineering": {
    college: "College of Computer Science",
    department: "Software Engineering",
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
  "HCI": {
    college: "College of Computer Science",
    department: "Software Engineering",
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

  /* ===== College of Computer Science / Artificial Intelligence ===== */
  "Artificial Intelligence": {
    college: "College of Computer Science",
    department: "Artificial Intelligence",
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
  "Machine Learning": {
    college: "College of Computer Science",
    department: "Artificial Intelligence",
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

  /* ===== College of Computer Science / Cybersecurity ===== */
  "Cybersecurity": {
    college: "College of Computer Science",
    department: "Cybersecurity",
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

  /* ===== College of Information Technology / Networks & Systems ===== */
  "IT Fundamentals": {
    college: "College of Information Technology",
    department: "Networks & Systems",
    name: "IT Fundamentals",
    desc: "The basics of hardware, software, networks and IT support",
    Beginner: [
      "Computer Hardware - CPU, RAM, storage",
      "Operating Systems Basics - Windows, Linux, macOS",
      "Software Types - applications, utilities",
      "File Management",
      "Internet & Web Basics",
      "IT Careers & Roles"
    ],
    Intermediate: [
      "Installing & Configuring OS",
      "Basic Networking - IP, Wi-Fi, routers",
      "Troubleshooting Methodology",
      "Hardware Troubleshooting",
      "User Accounts & Permissions",
      "Backup & Recovery"
    ],
    Advanced: [
      "Help Desk & Ticketing",
      "Security Basics - malware, updates",
      "Mobile Devices & Printers",
      "Virtualization Basics",
      "Cloud Services Overview",
      "CompTIA A+ Exam Topics Review"
    ]
  },
  "Network Administration": {
    college: "College of Information Technology",
    department: "Networks & Systems",
    name: "Network Administration",
    desc: "Setting up and running networks with switches and routers",
    Beginner: [
      "Network Components - switches, routers, cables",
      "IP Addressing & Subnetting Review",
      "Cisco IOS Basics - CLI, modes",
      "Basic Switch Configuration",
      "Basic Router Configuration",
      "Network Documentation"
    ],
    Intermediate: [
      "VLANs & Trunking",
      "Static & Dynamic Routing - OSPF",
      "DHCP & DNS Services",
      "NAT",
      "Wireless LAN Setup",
      "Access Control Lists"
    ],
    Advanced: [
      "Network Monitoring - SNMP, syslog",
      "High Availability - redundancy, HSRP",
      "VPNs",
      "Network Automation Basics",
      "Troubleshooting Complex Networks",
      "CCNA Exam Topics Review"
    ]
  },
  "Systems Administration": {
    college: "College of Information Technology",
    department: "Networks & Systems",
    name: "Systems Administration",
    desc: "Running Linux and Windows servers for an organisation",
    Beginner: [
      "Server Roles & Hardware",
      "Linux Command Line",
      "Linux Users, Groups & Permissions",
      "Windows Server Basics",
      "Package & Software Management",
      "Processes & Services"
    ],
    Intermediate: [
      "Active Directory - users, groups, GPO",
      "File Sharing - SMB, NFS",
      "Web Servers - Apache, Nginx, IIS",
      "Shell Scripting for Admins",
      "Logging & Monitoring",
      "Backup Strategies"
    ],
    Advanced: [
      "Server Hardening & Patching",
      "Configuration Management - Ansible",
      "Containers - Docker",
      "High Availability & Load Balancing",
      "Disaster Recovery Planning",
      "Sysadmin Case Studies"
    ]
  },
  "Cloud Computing": {
    college: "College of Information Technology",
    department: "Networks & Systems",
    name: "Cloud Computing",
    desc: "Using cloud services such as AWS, Azure and Google Cloud",
    Beginner: [
      "Cloud Concepts - IaaS, PaaS, SaaS",
      "Deployment Models - public, private, hybrid",
      "Cloud Providers Overview",
      "Virtual Machines in the Cloud",
      "Cloud Storage",
      "Cloud Pricing Basics"
    ],
    Intermediate: [
      "Cloud Networking - VPCs, subnets",
      "Identity & Access Management",
      "Managed Databases",
      "Serverless Computing",
      "Auto Scaling & Load Balancing",
      "Monitoring & Logging"
    ],
    Advanced: [
      "Infrastructure as Code - Terraform",
      "Containers & Kubernetes",
      "Cloud Security & Compliance",
      "Cost Optimisation",
      "Cloud Architecture - well-architected design",
      "Cloud Certification Review"
    ]
  },
  "Scripting & Automation": {
    college: "College of Information Technology",
    department: "Networks & Systems",
    name: "Scripting & Automation",
    desc: "Automating everyday IT tasks with scripts",
    Beginner: [
      "Why Automate - common IT tasks",
      "Bash Basics - variables, loops",
      "PowerShell Basics - cmdlets, pipeline",
      "Python for Scripting",
      "Working with Files & Folders",
      "Running Scripts Safely"
    ],
    Intermediate: [
      "Regular Expressions",
      "Parsing Logs & CSV Files",
      "Calling REST APIs from Scripts",
      "Scheduling Tasks - cron, Task Scheduler",
      "Error Handling & Logging",
      "Version Control for Scripts - Git"
    ],
    Advanced: [
      "Automating User Management",
      "Automating Cloud Resources",
      "Configuration Management Tools",
      "CI/CD Pipelines",
      "Testing Scripts",
      "Automation Project"
    ]
  },

  /* ===== College of Information Technology / Web & Mobile ===== */
  "Web Dev": {
    college: "College of Information Technology",
    department: "Web & Mobile",
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
  "JavaScript": {
    college: "College of Information Technology",
    department: "Web & Mobile",
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
    college: "College of Information Technology",
    department: "Web & Mobile",
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
  "Mobile Development": {
    college: "College of Information Technology",
    department: "Web & Mobile",
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
  "Web Design": {
    college: "College of Information Technology",
    department: "Web & Mobile",
    name: "Web Design (HTML & CSS)",
    desc: "Building good-looking, accessible web pages",
    Beginner: [
      "How the Web Works - browsers, servers",
      "HTML Structure - elements, attributes",
      "Text, Links & Images",
      "Lists & Tables",
      "Forms - inputs, labels",
      "CSS Basics - selectors, colours, fonts"
    ],
    Intermediate: [
      "Box Model - margin, padding, border",
      "Flexbox Layout",
      "CSS Grid Layout",
      "Responsive Design - media queries",
      "Typography & Colour for the Web",
      "Accessibility - WCAG basics"
    ],
    Advanced: [
      "CSS Variables & Theming",
      "Transitions & Animations",
      "Design Systems & Components",
      "Web Performance - images, loading",
      "Hosting & Publishing - GitHub Pages",
      "Portfolio Website Project"
    ]
  },

  /* ===== College of Information Technology / Information Systems ===== */
  "Systems Analysis": {
    college: "College of Information Technology",
    department: "Information Systems",
    name: "Systems Analysis & Design",
    desc: "Understanding business needs and designing information systems",
    Beginner: [
      "Information Systems Overview",
      "Role of the Systems Analyst",
      "SDLC - phases",
      "Feasibility Study",
      "Requirements Gathering - interviews, surveys",
      "Process Modelling Basics"
    ],
    Intermediate: [
      "Data Flow Diagrams",
      "Use Case Modelling",
      "Entity-Relationship Modelling",
      "UML - class and activity diagrams",
      "User Interface Design",
      "Prototyping"
    ],
    Advanced: [
      "System Architecture Design",
      "Agile Analysis - user stories",
      "Testing & Implementation",
      "Change Management & Training",
      "System Maintenance",
      "Case Study Project"
    ]
  },
  "Database Administration": {
    college: "College of Information Technology",
    department: "Information Systems",
    name: "Database Administration",
    desc: "Installing, securing, tuning and backing up databases",
    Beginner: [
      "Role of the DBA",
      "Installing a DBMS - MySQL, PostgreSQL, SQL Server",
      "SQL Review",
      "Users & Privileges",
      "Storage Structures",
      "Database Documentation"
    ],
    Intermediate: [
      "Backup & Restore",
      "Indexing & Performance Basics",
      "Monitoring Databases",
      "Transactions & Locking",
      "Data Import & Export",
      "Stored Procedures & Triggers"
    ],
    Advanced: [
      "Query Tuning - execution plans",
      "High Availability - replication",
      "Database Security & Auditing",
      "Cloud Databases",
      "Migrations & Upgrades",
      "DBA Case Studies"
    ]
  },
  "IT Project Management": {
    college: "College of Information Technology",
    department: "Information Systems",
    name: "IT Project Management",
    desc: "Delivering IT projects with Agile and traditional methods",
    Beginner: [
      "IT Projects - why they fail",
      "Project Life Cycle",
      "Project Charter & Scope",
      "Stakeholders",
      "Team Roles",
      "Project Management Tools - Jira, Trello"
    ],
    Intermediate: [
      "Work Breakdown Structure",
      "Scheduling & Gantt Charts",
      "Estimating Effort & Cost",
      "Agile & Scrum",
      "Kanban",
      "Risk Management"
    ],
    Advanced: [
      "Earned Value",
      "Quality Assurance",
      "Vendor Management & Outsourcing",
      "Change Control",
      "Project Closure",
      "PMP/PRINCE2 Exam Topics Review"
    ]
  },
  "IT Service Management": {
    college: "College of Information Technology",
    department: "Information Systems",
    name: "IT Service Management (ITIL)",
    desc: "Running IT as a reliable service for users",
    Beginner: [
      "What is a Service",
      "ITIL Overview - value system",
      "Service Desk",
      "Incident Management",
      "Service Level Agreements",
      "Customer Communication"
    ],
    Intermediate: [
      "Problem Management",
      "Change Enablement",
      "Service Request Management",
      "Configuration Management - CMDB",
      "Knowledge Management",
      "Service Metrics & KPIs"
    ],
    Advanced: [
      "Continual Improvement",
      "Service Design",
      "Availability & Capacity Management",
      "IT Asset Management",
      "Service Automation",
      "ITIL Foundation Exam Review"
    ]
  },
  "Information Security Management": {
    college: "College of Information Technology",
    department: "Information Systems",
    name: "Information Security Management",
    desc: "Managing security risks, policies and compliance in organisations",
    Beginner: [
      "Security Governance Basics",
      "Assets, Threats & Vulnerabilities",
      "Security Policies",
      "Security Awareness Training",
      "Physical Security",
      "Access Management"
    ],
    Intermediate: [
      "Risk Assessment",
      "Risk Treatment",
      "ISO 27001 Overview",
      "Security Controls - NIST",
      "Business Continuity",
      "Incident Management Process"
    ],
    Advanced: [
      "Security Audits",
      "Compliance - privacy laws",
      "Third-Party Risk",
      "Security Metrics",
      "Security Operations Centre",
      "Building a Security Programme"
    ]
  },

  /* ===== College of Business / Accounting & Finance ===== */
  "Financial Accounting": {
    college: "College of Business",
    department: "Accounting & Finance",
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
    college: "College of Business",
    department: "Accounting & Finance",
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
  "Corporate Finance": {
    college: "College of Business",
    department: "Accounting & Finance",
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
  "Auditing": {
    college: "College of Business",
    department: "Accounting & Finance",
    name: "Auditing",
    desc: "Checking that financial statements are true and fair",
    Beginner: [
      "What is an Audit - purpose, types",
      "Auditor Responsibilities & Ethics",
      "Auditing Standards",
      "Audit Evidence",
      "Audit Process Overview",
      "Materiality"
    ],
    Intermediate: [
      "Audit Risk",
      "Internal Control",
      "Testing Controls",
      "Substantive Procedures",
      "Audit Sampling",
      "Auditing Revenue & Receivables"
    ],
    Advanced: [
      "Auditing Inventory & Fixed Assets",
      "IT Audit Basics",
      "Fraud Detection",
      "Audit Reports & Opinions",
      "Internal Audit",
      "Audit Case Studies"
    ]
  },

  /* ===== College of Business / Economics ===== */
  "Microeconomics": {
    college: "College of Business",
    department: "Economics",
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
    college: "College of Business",
    department: "Economics",
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
    college: "College of Business",
    department: "Economics",
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

  /* ===== College of Business / Management ===== */
  "Principles of Management": {
    college: "College of Business",
    department: "Management",
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
    college: "College of Business",
    department: "Management",
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
  "Human Resource Management": {
    college: "College of Business",
    department: "Management",
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
    college: "College of Business",
    department: "Management",
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
  "Operations Management": {
    college: "College of Business",
    department: "Management",
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
  "Supply Chain Management": {
    college: "College of Business",
    department: "Management",
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
  },
  "Entrepreneurship": {
    college: "College of Business",
    department: "Management",
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
    college: "College of Business",
    department: "Management",
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
  "Business Law & Ethics": {
    college: "College of Business",
    department: "Management",
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
  "Business Communication": {
    college: "College of Business",
    department: "Management",
    name: "Business Communication",
    desc: "Writing and speaking clearly at work",
    Beginner: [
      "Communication Process",
      "Business Writing Basics - clarity, tone",
      "Emails & Memos",
      "Listening Skills",
      "Non-Verbal Communication",
      "Workplace Etiquette"
    ],
    Intermediate: [
      "Business Letters",
      "Reports & Proposals",
      "Presentations - structure, slides",
      "Meetings",
      "Persuasive Communication",
      "Cross-Cultural Communication"
    ],
    Advanced: [
      "Negotiation",
      "Crisis Communication",
      "Digital & Social Media Communication",
      "Job Applications - CV, cover letter",
      "Interviews",
      "Communication Ethics"
    ]
  },

  /* ===== College of Business / Marketing ===== */
  "Marketing": {
    college: "College of Business",
    department: "Marketing",
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
  "Digital Marketing": {
    college: "College of Business",
    department: "Marketing",
    name: "Digital Marketing",
    desc: "Reaching customers online with search, social and email",
    Beginner: [
      "Digital Marketing Overview",
      "Customer Journey Online",
      "Websites & Landing Pages",
      "Content Marketing",
      "Social Media Basics",
      "Email Marketing Basics"
    ],
    Intermediate: [
      "SEO - search engine optimisation",
      "Paid Search - Google Ads",
      "Social Media Advertising",
      "Influencer Marketing",
      "Marketing Automation",
      "Web Analytics - Google Analytics"
    ],
    Advanced: [
      "Conversion Rate Optimisation",
      "A/B Testing",
      "Digital Marketing Strategy",
      "E-commerce Marketing",
      "Privacy & Ethics Online",
      "Digital Campaign Project"
    ]
  },

  /* ===== College of Business / Information Systems ===== */
  "MIS": {
    college: "College of Business",
    department: "Information Systems",
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
  }
};
