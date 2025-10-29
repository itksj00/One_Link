// ==========================================
// 링크 설정 파일
// ==========================================
// 
// 📖 사용 방법:
// 1. 아래 URL들을 원하는 링크로 변경하세요
// 2. HTML 파일에서 data-link 속성과 매칭됩니다
//
// 예시:
// HTML: <a data-link="section1.linkedin" ...>
// 여기: section1: { linkedin: '당신의URL' }
//
// ==========================================

const linkConfig = {
    // 섹션 1: 소셜 링크 / 소개
    section1: {
        linkedin: 'https://linkedin.com/in/yourprofile',
        github: 'https://github.com/yourusername',
        twitter: 'https://twitter.com/yourhandle',
        email: 'mailto:your.email@example.com'
    },

    // 섹션 2: 이력서 / 경력 소개
    section2: {
        resume: 'https://notion.so/your-resume-page',
        experience: 'https://notion.so/your-experience',
        skills: 'https://notion.so/your-skills',
        cv: '/path-to-cv.pdf'
    },

    // 섹션 3: 포트폴리오 / 프로젝트
    section3: {
        portfolio: 'https://notion.so/your-portfolio',
        project1: 'https://github.com/yourusername/project1',
        project2: 'https://github.com/yourusername/project2',
        website: 'https://yourwebsite.com'
    },

    // 섹션 4: 취미 / 개인 이야기
    section4: {
        hobbies: 'https://notion.so/your-hobbies',
        story: 'https://notion.so/your-story',
        travel: 'https://notion.so/travel',
        photography: 'https://notion.so/photography'
    }
};