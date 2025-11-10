// Comprehensive skills database organized by categories
export const skillsDatabase = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Ruby', 'PHP', 'Swift',
  'Kotlin', 'Go', 'Rust', 'Scala', 'R', 'MATLAB', 'Perl', 'Objective-C', 'Dart', 'Elixir',
  'Haskell', 'Julia', 'Lua', 'Shell Scripting', 'Bash', 'PowerShell', 'VBA', 'SQL', 'PL/SQL',
  
  // Frontend Technologies
  'React', 'React.js', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'jQuery', 'HTML', 'HTML5',
  'CSS', 'CSS3', 'Sass', 'SCSS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design',
  'Chakra UI', 'Styled Components', 'Emotion', 'Redux', 'Redux Toolkit', 'MobX', 'Zustand',
  'Recoil', 'Context API', 'React Query', 'SWR', 'Webpack', 'Vite', 'Parcel', 'Rollup',
  'Babel', 'ESLint', 'Prettier', 'Storybook', 'Jest', 'React Testing Library', 'Cypress',
  'Playwright', 'WebGL', 'Three.js', 'D3.js', 'Chart.js', 'Framer Motion', 'GSAP',
  
  // Backend Technologies
  'Node.js', 'Express.js', 'NestJS', 'Fastify', 'Koa', 'Django', 'Flask', 'FastAPI',
  'Spring Boot', 'Spring Framework', 'ASP.NET', '.NET Core', 'Ruby on Rails', 'Laravel',
  'Symfony', 'CodeIgniter', 'Gin', 'Echo', 'Fiber', 'Phoenix', 'GraphQL', 'REST API',
  'RESTful Services', 'SOAP', 'gRPC', 'WebSockets', 'Socket.io', 'Microservices',
  
  // Databases
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Microsoft SQL Server',
  'MariaDB', 'Cassandra', 'DynamoDB', 'Firebase', 'Firestore', 'CouchDB', 'Neo4j',
  'Elasticsearch', 'Apache Solr', 'InfluxDB', 'TimescaleDB', 'Supabase', 'Prisma',
  'TypeORM', 'Sequelize', 'Mongoose', 'Knex.js', 'Database Design', 'Database Optimization',
  'SQL Optimization', 'NoSQL', 'Data Modeling',
  
  // Cloud & DevOps
  'AWS', 'Amazon Web Services', 'Azure', 'Microsoft Azure', 'Google Cloud Platform', 'GCP',
  'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'CircleCI',
  'Travis CI', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'CloudFormation', 'Helm',
  'ArgoCD', 'Nginx', 'Apache', 'Load Balancing', 'Auto Scaling', 'EC2', 'S3', 'Lambda',
  'ECS', 'EKS', 'RDS', 'CloudWatch', 'CloudFront', 'Route 53', 'VPC', 'IAM',
  
  // Mobile Development
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin',
  'Ionic', 'Cordova', 'SwiftUI', 'UIKit', 'Jetpack Compose', 'Mobile UI/UX',
  
  // Data Science & AI
  'Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch',
  'Keras', 'scikit-learn', 'Pandas', 'NumPy', 'SciPy', 'Natural Language Processing',
  'NLP', 'Computer Vision', 'OpenCV', 'YOLO', 'Data Analysis', 'Data Visualization',
  'Tableau', 'Power BI', 'Jupyter', 'Google Colab', 'Statistical Analysis', 'A/B Testing',
  'Predictive Modeling', 'Feature Engineering', 'Model Deployment', 'MLOps',
  
  // Version Control & Collaboration
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'Git Flow', 'Version Control',
  'Code Review', 'Pull Requests', 'Jira', 'Confluence', 'Trello', 'Asana', 'Monday.com',
  'Notion', 'Slack', 'Microsoft Teams',
  
  // Testing & Quality Assurance
  'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Test-Driven Development',
  'TDD', 'Behavior-Driven Development', 'BDD', 'Selenium', 'Appium', 'Postman', 'Insomnia',
  'JUnit', 'Mockito', 'PyTest', 'Mocha', 'Chai', 'Jasmine', 'Karma', 'TestNG',
  'Load Testing', 'Performance Testing', 'Security Testing', 'Penetration Testing',
  
  // Security
  'Cybersecurity', 'Application Security', 'Network Security', 'OAuth', 'JWT',
  'Authentication', 'Authorization', 'Encryption', 'HTTPS', 'SSL/TLS', 'OWASP',
  'Vulnerability Assessment', 'Security Auditing', 'SIEM', 'Firewall Configuration',
  
  // Design & UI/UX
  'UI Design', 'UX Design', 'User Interface Design', 'User Experience Design', 'Figma',
  'Adobe XD', 'Sketch', 'InVision', 'Prototyping', 'Wireframing', 'User Research',
  'Usability Testing', 'Information Architecture', 'Interaction Design', 'Design Systems',
  'Responsive Design', 'Mobile-First Design', 'Accessibility', 'WCAG', 'Adobe Photoshop',
  'Adobe Illustrator', 'Adobe After Effects',
  
  // Project Management & Methodology
  'Agile', 'Scrum', 'Kanban', 'Lean', 'Waterfall', 'Project Management', 'Product Management',
  'Stakeholder Management', 'Risk Management', 'Resource Planning', 'Sprint Planning',
  'Backlog Management', 'Requirements Gathering', 'Product Roadmap', 'User Stories',
  'Epic Creation', 'OKRs', 'KPIs', 'PMP', 'SAFe', 'Six Sigma',
  
  // Business & Soft Skills
  'Leadership', 'Team Management', 'Communication', 'Problem Solving', 'Critical Thinking',
  'Analytical Skills', 'Strategic Planning', 'Decision Making', 'Time Management',
  'Conflict Resolution', 'Negotiation', 'Presentation Skills', 'Public Speaking',
  'Technical Writing', 'Documentation', 'Mentoring', 'Coaching', 'Collaboration',
  'Cross-functional Teamwork', 'Stakeholder Communication', 'Client Relations',
  
  // Other Technical Skills
  'Blockchain', 'Ethereum', 'Solidity', 'Web3', 'Smart Contracts', 'Cryptocurrency',
  'IoT', 'Embedded Systems', 'Arduino', 'Raspberry Pi', 'MQTT', 'Robotics',
  'Game Development', 'Unity', 'Unreal Engine', 'AR/VR', 'Computer Graphics',
  'System Design', 'Architecture Design', 'Design Patterns', 'Object-Oriented Programming',
  'OOP', 'Functional Programming', 'Algorithms', 'Data Structures', 'Big O Notation',
  'Code Optimization', 'Performance Optimization', 'Caching', 'CDN', 'Search Engine Optimization',
  'SEO', 'SEM', 'Google Analytics', 'Google Tag Manager', 'Digital Marketing',
  'Content Management Systems', 'CMS', 'WordPress', 'Drupal', 'Shopify', 'Magento',
  'E-commerce', 'Payment Integration', 'Stripe', 'PayPal', 'API Integration',
  'Third-Party Integration', 'Salesforce', 'CRM', 'ERP', 'SAP', 'ServiceNow',
  'Linux', 'Unix', 'Windows Server', 'macOS', 'System Administration', 'Network Administration',
  'TCP/IP', 'DNS', 'DHCP', 'VPN', 'SSH', 'FTP', 'SFTP',
  'Agile Methodologies', 'CI/CD', 'Continuous Integration', 'Continuous Deployment',
  'Monitoring', 'Logging', 'Debugging', 'Troubleshooting', 'Root Cause Analysis'
];

/**
 * Sophisticated fuzzy matching algorithm for skill suggestions
 * Uses multiple scoring techniques:
 * 1. Exact substring match (highest priority)
 * 2. Word boundary matching
 * 3. Character-by-character similarity
 * 4. Levenshtein distance for typo tolerance
 */
export function fuzzyMatch(input, skill) {
  if (!input || !skill) return 0;
  
  const inputLower = input.toLowerCase().trim();
  const skillLower = skill.toLowerCase();
  
  // Exact match
  if (skillLower === inputLower) return 1000;
  
  // Starts with input (highest priority after exact)
  if (skillLower.startsWith(inputLower)) return 900;
  
  // Contains as whole word
  const wordBoundaryRegex = new RegExp(`\\b${escapeRegex(inputLower)}`, 'i');
  if (wordBoundaryRegex.test(skillLower)) return 800;
  
  // Contains anywhere
  if (skillLower.includes(inputLower)) return 700;
  
  // Acronym match (e.g., "js" matches "JavaScript")
  if (matchesAcronym(inputLower, skillLower)) return 600;
  
  // Character-by-character similarity
  const charSimilarity = getCharacterSimilarity(inputLower, skillLower);
  if (charSimilarity > 0.6) return 500 + (charSimilarity * 100);
  
  // Levenshtein distance for typo tolerance
  const distance = levenshteinDistance(inputLower, skillLower);
  const maxLength = Math.max(inputLower.length, skillLower.length);
  const similarity = 1 - (distance / maxLength);
  
  if (similarity > 0.7) return 400 + (similarity * 100);
  
  return 0;
}

/**
 * Get skill suggestions based on user input
 * @param {string} input - User's current input
 * @param {number} limit - Maximum number of suggestions (default: 10)
 * @returns {Array<string>} - Sorted array of skill suggestions
 */
export function getSkillSuggestions(input, limit = 10) {
  if (!input || input.trim().length < 1) return [];
  
  const scored = skillsDatabase.map(skill => ({
    skill,
    score: fuzzyMatch(input, skill)
  }));
  
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.skill);
}

// Helper function to escape special regex characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Check if input matches acronym of skill
function matchesAcronym(input, skill) {
  const words = skill.split(/[\s.-]/);
  if (words.length < 2) return false;
  
  const acronym = words.map(w => w[0]).join('').toLowerCase();
  return acronym.startsWith(input) || acronym === input;
}

// Calculate character-by-character similarity
function getCharacterSimilarity(str1, str2) {
  let matches = 0;
  let j = 0;
  
  for (let i = 0; i < str1.length; i++) {
    while (j < str2.length) {
      if (str1[i] === str2[j]) {
        matches++;
        j++;
        break;
      }
      j++;
    }
  }
  
  return matches / str1.length;
}

// Calculate Levenshtein distance for typo tolerance
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}
