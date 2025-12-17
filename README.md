<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hijri Calendar (Umm al-Qura + Online Verification)</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    header {
      background-color: #2c3e50;
      color: white;
      padding: 2rem;
      text-align: center;
    }
    header h1 {
      margin: 0;
      font-size: 2.2rem;
    }
    header p {
      font-size: 1.2rem;
      margin-top: 0.5rem;
    }
    main {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.1);
      padding: 2rem;
    }
    section {
      margin-bottom: 2rem;
    }
    h2 {
      color: #2c3e50;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 0.3rem;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      padding: 1.5rem;
      background-color: #ecf0f1;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Hijri Calendar (Umm al-Qura + Online Verification Hybrid)</h1>
    <p>A fast and lightweight Hijri calendar and date conversion system with accurate month transitions.</p>
  </header>
  <main>
    <section>
      <h2>Overview</h2>
      <p>
        This project provides a modern, fast-loading Hijri calendar and date conversion system that combines the widely used <strong>Umm al-Qura calendar</strong> with selective online verification for precise month transitions. By leveraging local calendar data for the majority of dates and performing online verification only when necessary, the system ensures both speed and accuracy. It is designed as a <strong>static, client-side application</strong> and can be deployed easily using <strong>GitHub Pages</strong>, eliminating the need for any backend infrastructure.
      </p>
      <p>
        The hybrid approach of this calendar allows users to quickly access Hijri dates while ensuring reliability for the sensitive month transition days, particularly around day 29 of the lunar month. This makes it ideal for web applications, educational tools, and personal use cases where both performance and accuracy are important.
      </p>
    </section>

    <section>
      <h2>How It Works</h2>
      <p>
        The system operates on a simple but effective principle: 
      </p>
      <ul>
        <li><strong>Days 1–28:</strong> The Hijri dates are loaded instantly using pre-stored <strong>Umm al-Qura calendar data</strong>. This ensures extremely fast loading times and full offline usability.</li>
        <li><strong>Day 29:</strong> On this day, the application performs a single online verification to determine whether the lunar month has ended or will continue to day 30. This guarantees that the displayed dates remain accurate even in months with 29 or 30 days.</li>
      </ul>
      <p>
        By limiting online verification to only the days that need it, the system remains lightweight and efficient, reducing unnecessary external requests while maintaining a high level of practical accuracy.
      </p>
      <p>
        Additionally, the application is designed with graceful error handling. In the unlikely event that online verification is unavailable, the calendar falls back to the local Umm al-Qura data, ensuring continuous usability without interruptions.
      </p>
    </section>

    <section>
      <h2>Performance and Efficiency</h2>
      <p>
        Performance is a core feature of this project. With the majority of days (1–28) resolved locally, the calendar renders instantly in the browser without any network requests. Even on day 29, where online verification occurs, the system performs only a single request and completes the check within milliseconds, providing a seamless experience for users.
      </p>
      <p>
        The combination of local data and minimal online checks ensures that this calendar is not only fast but also highly efficient, making it suitable for use in web applications and static websites hosted on platforms like GitHub Pages.
      </p>
    </section>

    <section>
      <h2>Automatic Redirect</h2>
      <p>
        After displaying the calculated Hijri date, users are automatically redirected to the full official calendar site: <a href="https://ummalquracalendar.org/" target="_blank">ummalquracalendar.org</a>. The redirect occurs automatically after 5 seconds, providing users with access to additional features and a complete calendar experience without requiring any interaction or confirmation.
      </p>
      <p>
        This ensures a smooth user journey from the fast-loading demo to the authoritative source, maintaining continuity and a professional experience.
      </p>
    </section>

    <section>
      <h2>Technology Stack</h2>
      <p>
        The project is built using a simple, modern stack that emphasizes portability and ease of deployment:
      </p>
      <ul>
        <li><strong>Node.js:</strong> For development tooling and optional build scripts.</li>
        <li><strong>Vanilla JavaScript:</strong> Handles all client-side logic, including date calculations and conditional verification.</li>
        <li><strong>Static HTML & JSON:</strong> Stores local calendar data and renders content efficiently.</li>
        <li><strong>GitHub Pages:</strong> Provides free static hosting for instant deployment and sharing.</li>
      </ul>
    </section>

    <section>
      <h2>Important Notes</h2>
      <ul>
        <li>This project uses calculation-based Hijri dates and may not reflect actual moon sighting.</li>
        <li>The online verification is only used to ensure accuracy around month transitions and is not a substitute for official announcements.</li>
        <li>Local Umm al-Qura data provides fast, reliable results for the majority of days.</li>
        <li>Users are automatically redirected to <a href="https://ummalquracalendar.org/" target="_blank">ummalquracalendar.org</a> for a full calendar experience.</li>
      </ul>
    </section>

    <section>
      <h2>Goals</h2>
      <p>
        The primary goals of this project are to provide a lightweight, efficient, and accurate Hijri calendar, demonstrate a hybrid approach combining local and online verification, and provide an entry point to the full official calendar at <a href="https://ummalquracalendar.org/" target="_blank">ummalquracalendar.org</a>. By balancing speed and accuracy, this calendar is suitable for educational purposes, web applications, and personal use.
      </p>
      <p>
        It also showcases a best-practice approach for static web applications: minimal reliance on external services, fallback mechanisms, and seamless integration with authoritative sources.
      </p>
    </section>

    <section>
      <h2>License</h2>
      <p>
        This project is open-source. See the <code>LICENSE</code> file for more details.
      </p>
    </section>
  </main>

  <footer>
    &copy; 2025 Umm al-Qura Calendar Project | <a href="https://ummalquracalendar.org/" target="_blank">Visit Full Calendar</a>
  </footer>
</body>
</html>
