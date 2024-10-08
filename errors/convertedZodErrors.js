export default function convertedZodErrors(error) {
    return error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
    }, {})
}