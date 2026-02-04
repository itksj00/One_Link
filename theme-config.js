// ==========================================
// 폰트 및 색상 설정 파일
// ==========================================
// 
// 📝 이 파일에서 폰트 크기, 색상 등을 자유롭게 수정하세요!
//
// ==========================================

const themeConfig = {
    cover: {
        titleFontSize: '1.75rem',          // ← 여기! 2.2rem → 1.9rem으로 줄임 (독일어 기준 한 줄 확보)
        titleColor: '#fffaf0',
        
        subtitleFontSize: '2.4rem',       // 이름은 그대로 크게 유지 (또는 2.2rem으로 맞춰도 OK)
        subtitleColor: '#fffaf0',         // story of와 동일 색상
    },
 
    // 📄 1번 페이지 (인트로)
    intro: {
        nameFontSize: '2.2rem',           // 이름 크기
        nameColor: '#5a4d42',             // 이름 색상
        
        titleFontSize: '1.2rem',          // 직함 크기
        titleColor: '#8b7355',            // 직함 색상
        
        taglineFontSize: '0.95rem',       // 태그라인 크기
        taglineColor: '#6b5d52',          // 태그라인 색상
        
        highlightFontSize: '0.85rem',     // 이력 항목 크기
        highlightColor: '#7a6149',        // 이력 항목 색상
    },

    // 📝 일반 페이지
    page: {
        headingFontSize: '1.4rem',        // 제목(h2) 크기
        headingColor: '#5a4d42',          // 제목 색상
        
        textFontSize: '0.85rem',          // 본문 크기
        textColor: '#6b5d52',             // 본문 색상
    },

    // 🔗 링크 카드
    linkCard: {
        iconSize: '1.5rem',               // 아이콘 크기
        labelFontSize: '0.85rem',         // 라벨 크기
    }
};