# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in StudyNest, please **do not** open a public GitHub issue. Instead, please email **kacper@studynest.dev** with:

1. Description of the vulnerability
2. Steps to reproduce it
3. Potential impact
4. Suggested fix (if any)

Please allow us time to investigate and release a fix before public disclosure.

## Security Considerations

StudyNest is a privacy-first application that stores all data locally in your browser using `localStorage`. No data is sent to external servers.

### What's Protected

- All user data (tasks, settings, statistics) is stored only in your browser
- Audio data is generated locally using Web Audio API
- No analytics or telemetry is collected

### What's Not Protected

- Local storage data is not encrypted (standard browser limitation)
- Data persists across browser sessions on the same device
- Clearing browser data will remove all StudyNest data

## Dependencies

We regularly update dependencies for security patches. Check `package.json` for current versions.

To check for known vulnerabilities:

```bash
npm audit
```

## Support

If you have any security concerns or questions, please contact us at **kacper@studynest.dev**.
