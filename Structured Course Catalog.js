const course = {
    instructor: {
        name: ["Mr Mac", "Mr Davidson", "Ms Sasha"],
        times: ["morning", "noon", "afternoon"],
    },
    prerequisite: null
};
const check = {
    ...course,
    instructor: { ...course.instructor, times: ["morning"] }
};

function search(search) {
    const term = String(search ?? "").toLowerCase();
    return catalog.filter(course => course.name.toLowerCase().includes(term) || course.instructor.name.toLowerCase().includes(term));
}
function filter(criteria = {}) {
    return catalog.filter(course => {
        const departmentMatches =
            !criteria.department ||
            course.department === criteria.department;

        const timeMatches =
            !criteria.time ||
            course.schedule.times.some(
                time => time.toLowerCase() === criteria.time.toLowerCase()
            );
        const prerequisiteMatches =
            criteria.hasPrerequisite === undefined ||
            (course.prerequisite !== null) === criteria.hasPrerequisite;
        return departmentMatches &&
            timeMatches &&
            prerequisiteMatches;
    });
}
function summarize(summary) {
    {
        const departments = {};
        for (const course of catalog) {
            departments[course.department] =
                (departments[course.department] || 0) + 1;
        }
        return {
            totalCourses: catalog.length,
            departments,
            coursesWithoutPrerequisites: catalog.filter(
                course => course.prerequisite === null).length
        };
    }
}
function updateSchedule(catalog, courseId, newTimes) {
    return catalog.map(course =>
        course.id === courseId
            ? {
                ...course,
                schedule: {
                    ...course.schedule,
                    times: [...newTimes]
                }
            }
            : course
    );
}
function getInstructorOffice(course) {
    return course.instructor?.office ?? "Office not provided";
}
const catalog = [
    {
        class: 1,
        name: "Introduction to Science",
        department: "Science",
        instructor: {
            name: "Mr Mac",
            office: "Room 101"
        },
        schedule: { times: ["Morning", "Noon"] },
        prerequisite: null
    },
    {
        class: 2,
        name: "Intro to Mathematics",
        department: "Mathemathics",
        instructor: {
            name: "Mr Davidson",
            office: "Room 200"
        },
        schedule: { times: ["Morning", "Noon", "afternoon"] },
        prerequisite: null
    },
    {
        class: 3,
        name: "Biology",
        department: "Biology",
        instructor: {
            name: "Ms Sasha",
            office: "Room 121"
        },
        schedule: { times: ["Noon"] },
        prerequisite: null
    },
    {
        class: 4,
        name: "Advanced Python",
        department: "Programming",
        instructor: {
            name: "Mr Jones",
            office: "Room 108"
        },
        schedule: {
            times: ["Morning", "Noon", "Afternoon"]
        },
        prerequisite: null
    },
    {
        class: 5,
        name: "Introduction to Science",
        department: "Science",
        instructor: {
            name: "Mr Mac",
            office: "Room 101"
        },
        schedule: { times: ["Morning", "Noon"] },
        prerequisite: null
    },
    {
        class: 6,
        name: "Advanced Science",
        department: "Science",
        instructor: {
            name: "Mr Mac",
            office: "Room 101"
        },
        schedule: { times: ["Noon"] },
        prerequisite: null
    },
    {
       class: 7,
        name: "Advanced Science",
        department: "Science",
        instructor: {
            name: "Mr Mac",
            office: "Room 101"
        },
        schedule: { times: ["Noon"] },
        prerequisite: null
    },
    {
        class: 8,
        name: "Advanced Science",
        department: "Science",
        instructor: {
            name: "Mr Mac",
            office: "Room 101"
        },
        schedule: { times: ["Noon"] },
        prerequisite: null
    },
]
const jsonCatalog = JSON.stringify(catalog, null, 2);
const parsedCatalog = JSON.parse(jsonCatalog);

console.log("Search:", search("science"));
console.log("Science courses:", filter({ department: "Science" }));
console.log("Morning courses:", filter({ time: "Morning" }));
console.log("No prerequisites:", filter({ hasPrerequisite: false }));
console.log("Summary:", summarize());

console.log(
    "Missing office:",
    getInstructorOffice(catalog[3])
);

const updatedCatalog = updateSchedule(
    catalog,
    1,
    ["Morning"]
);
console.log(course.instructor.times);
console.log(check.instructor.times);
console.log(course === check);
console.log("Original times:", catalog[0].schedule.times);
console.log("Updated times:", updatedCatalog[0].schedule.times);
console.log("Original catalog preserved:", catalog !== updatedCatalog);
console.log("JSON round-trip successful:", parsedCatalog.length === 8);
