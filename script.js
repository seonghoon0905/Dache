document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('input');
    const outputElement = document.getElementById('output');
    const convertBtn = document.getElementById('convert');
    const copyBtn = document.getElementById('copy');

    function convertToBanmal(text) {
        if (!text) return '';
        let result = text;
        
        // 1. 의문형
        const rules1 = [
            { pattern: /하시겠습니까\?/g, replace: '하겠는가?' },
            { pattern: /시겠습니까\?/g, replace: '겠는가?' },
            { pattern: /겠습니까\?/g, replace: '겠는가?' },
            { pattern: /하십니까\?/g, replace: '하는가?' },
            { pattern: /십니까\?/g, replace: '는가?' },
            { pattern: /습니까\?/g, replace: '는가?' },
            { pattern: /입니까\?/g, replace: '인가?' },
            { pattern: /인가요\?/g, replace: '인가?' },
            { pattern: /건가요\?/g, replace: '건가?' },
            { pattern: /할까요\?/g, replace: '할까?' },
            { pattern: /을까요\?/g, replace: '을까?' },
            { pattern: /까요\?/g, replace: '까?' },
            { pattern: /나요\?/g, replace: '나?' }
        ];

        // 2. 형용사 예외 사전 (합니다 -> 하다 로 변환되어야 하는 단어들)
        // 수백 개의 자주 쓰이는 형용사 어간을 대량으로 등록했습니다.
        const adjectives = '필요|중요|가능|불가능|다양|단순|복잡|특별|유명|비슷|동일|행복|불행|건강|불편|편안|안전|위험|심각|민감|둔감|강력|유용|유익|정확|확실|명확|명백|투명|궁금|상당|충분|부족|적절|타당|합당|부당|당연|완벽|불완전|신속|친절|불친절|조용|따뜻|차분|얌전|요란|화려|소박|수수|비참|처참|끔찍|대단|위대|훌륭|엄청|굉장|막대|거대|거창|찬란|영롱|우수|열등|탁월|넉넉|풍족|빈약|허술|치밀|꼼꼼|무모|과감|소심|대담|용감|비겁|정당|비열|순수|불순|진실|거짓|솔직|뻔뻔|당당|겸손|거만|오만|무례|친밀|소외|고독|허전|희미|선명|뚜렷|애매|모호|수월|용이|간편|지루|따분|다행|불안|초조|다급|느긋|한가|분주|성실|불성실|정직|부정직|성급|침착|경솔|신중|똑똑|멍청|영리|예리|단단|튼튼|부실|연약|강인|굳건|확고|분명|막연|막막|답답|후련|통쾌|상쾌|불쾌|유쾌|기발|참신|진부|식상|평범|특이|이상|기이|황당|기특|대견|갸륵|괘씸|얄팍|천박|고상|우아|세련|미숙|노련|숙련|익숙|친숙|어색|감동적|인상적|매력적|치명적|결정적|상대적|절대적|객관적|주관적|긍정적|부정적|낙관적|비관적|진취적|보수적|개방적|폐쇄적|적극적|소극적|능동적|수동적|자발적|강제적|필수적|선택적|부수적|핵심적|기본적|부가적|일시적|영구적|지속적|단기적|장기적|규칙적|불규칙적|정상적|비정상적|합리적|비합리적|논리적|비논리적|감정적|이성적|충동적|계획적|체계적|환상적|낭만적|현실적|이상적|구체적|추상적|포괄적|세부적|전반적|부분적|일방적|예외적|거룩|건전|결백|경건|고결|고단|고요|공평|공정|교활|균등|기구|나른|단호|당돌|도도|독특|떳떳|만만|매정|명석|무난|무던|무심|미묘|민망|뾰로통|섭섭|씁쓸|어렴풋|엉뚱|여전|영원|온당|온화|완강|우울|원활|유창|은은|잔잔|절실|조급|존엄|쫀득|캄캄|투박|평온|풋풋|피곤|화창|황량|흐릿|흔하|거북|고소|고약|괴상|구수|꿋꿋|능청|단정|다정|다채|든든|막강|멀쩡|무관|뭉클|미지근|번잡|번듯|뿌듯|시원|씩씩|아득|아련|억울|엉성|우람|울창|웅장|은밀|자상|자질구레|잔혹|절묘|정교|짭짤|찜찜|칼칼|쾌적|팍팍|팽팽|포근|푹신|풍성|푸짐|호화|흐뭇';
        const adjRegex = new RegExp(`(${adjectives})합니다(\\.|\\?|!| |$)`, 'g');

        // 2-2. 일반 동사 예외 사전 (습니다 -> 는다 로 변환)
        const verbs = '먹|받|읽|찾|입|벗|신|닫|믿|묻|걷|얻|잃|앉|잡|웃|씻|닦|찍|깎|볶|섞|꺾|겪|묶|묵|죽|썩|속|숨|넘|남|담|닮|늙|밟|핥|뽑|씹|업|접|집|쫓|맞|붙|쏟|뻗|안|얹|끊|끓|굶|곯|달|뚫';
        const verbRegex = new RegExp(`(${verbs})습니다(\\.|\\?|!| |$)`, 'g');
        result = result.replace(verbRegex, '$1는다$2');
        // 3. 평서문 '니다' 형태
        const rules2 = [
            { pattern: /이십니다(\.|\?|!| |$)/g, replace: '이시다$1' },
            { pattern: /으십니다(\.|\?|!| |$)/g, replace: '으시다$1' },
            { pattern: /하십니다(\.|\?|!| |$)/g, replace: '하신다$1' },
            { pattern: /십니다(\.|\?|!| |$)/g, replace: '시다$1' },
            { pattern: /했습니다(\.|\?|!| |$)/g, replace: '했다$1' },
            { pattern: /였습니다(\.|\?|!| |$)/g, replace: '였다$1' },
            { pattern: /입니다(\.|\?|!| |$)/g, replace: '이다$1' },
            { pattern: /합니다(\.|\?|!| |$)/g, replace: '한다$1' }, // 일반 동사는 한다
            { pattern: /됩니다(\.|\?|!| |$)/g, replace: '된다$1' },
            { pattern: /봅니다(\.|\?|!| |$)/g, replace: '본다$1' },
            { pattern: /줍니다(\.|\?|!| |$)/g, replace: '준다$1' },
            { pattern: /냅니다(\.|\?|!| |$)/g, replace: '낸다$1' },
            { pattern: /씁니다(\.|\?|!| |$)/g, replace: '쓴다$1' },
            { pattern: /섭니다(\.|\?|!| |$)/g, replace: '선다$1' },
            { pattern: /탑니다(\.|\?|!| |$)/g, replace: '탄다$1' },
            { pattern: /칩니다(\.|\?|!| |$)/g, replace: '친다$1' },
            { pattern: /켭니다(\.|\?|!| |$)/g, replace: '켠다$1' },
            { pattern: /뺍니다(\.|\?|!| |$)/g, replace: '뺀다$1' },
            { pattern: /킵니다(\.|\?|!| |$)/g, replace: '킨다$1' },
            { pattern: /집니다(\.|\?|!| |$)/g, replace: '진다$1' },
            { pattern: /둡니다(\.|\?|!| |$)/g, replace: '둔다$1' },
            { pattern: /만듭니다(\.|\?|!| |$)/g, replace: '만든다$1' },
            { pattern: /삽니다(\.|\?|!| |$)/g, replace: '산다$1' },
            { pattern: /압니다(\.|\?|!| |$)/g, replace: '안다$1' },
            { pattern: /웁니다(\.|\?|!| |$)/g, replace: '운다$1' },
            { pattern: /놉니다(\.|\?|!| |$)/g, replace: '논다$1' },
            { pattern: /습니다(\.|\?|!| |$)/g, replace: '다$1' },
            { pattern: /납니다(\.|\?|!| |$)/g, replace: '난다$1' },
            { pattern: /갑니다(\.|\?|!| |$)/g, replace: '간다$1' },
            { pattern: /옵니다(\.|\?|!| |$)/g, replace: '온다$1' }
        ];

        // 4. '요'로 끝나는 평서문 형태
        const rules3 = [
            { pattern: /할게요(\.|\?|!| |$)/g, replace: '하겠다$1' },
            { pattern: /을게요(\.|\?|!| |$)/g, replace: '겠다$1' },
            { pattern: /게요(\.|\?|!| |$)/g, replace: '겠다$1' },
            { pattern: /이세요(\.|\?|!| |$)/g, replace: '이시다$1' },
            { pattern: /으세요(\.|\?|!| |$)/g, replace: '으시다$1' },
            { pattern: /하세요(\.|\?|!| |$)/g, replace: '해라$1' },
            { pattern: /세요(\.|\?|!| |$)/g, replace: '시라$1' },
            { pattern: /이에요(\.|\?|!| |$)/g, replace: '이다$1' },
            { pattern: /예요(\.|\?|!| |$)/g, replace: '이다$1' },
            { pattern: /아니에요(\.|\?|!| |$)/g, replace: '아니다$1' },
            { pattern: /셨어요(\.|\?|!| |$)/g, replace: '셨다$1' },
            { pattern: /하셨어요(\.|\?|!| |$)/g, replace: '하셨다$1' },
            { pattern: /했어요(\.|\?|!| |$)/g, replace: '했다$1' },
            { pattern: /였어요(\.|\?|!| |$)/g, replace: '였다$1' },
            { pattern: /해요(\.|\?|!| |$)/g, replace: '한다$1' }
        ];

        // 5. 감탄사 및 기타
        const rules4 = [
            { pattern: /하시죠(\.|\?|!| |$)/g, replace: '하자$1' },
            { pattern: /시죠(\.|\?|!| |$)/g, replace: '시다$1' },
            { pattern: /이죠(\.|\?|!| |$)/g, replace: '이다$1' },
            { pattern: /하죠(\.|\?|!| |$)/g, replace: '하다$1' },
            { pattern: /죠(\.|\?|!| |$)/g, replace: '다$1' },
            { pattern: /네요(\.|\?|!| |$)/g, replace: '네$1' },
            { pattern: /군요(\.|\?|!| |$)/g, replace: '구나$1' },
            { pattern: /인데요(\.|\?|!| |$)/g, replace: '인데$1' },
            { pattern: /는데요(\.|\?|!| |$)/g, replace: '는데$1' },
            { pattern: /은데요(\.|\?|!| |$)/g, replace: '은데$1' },
            { pattern: /ㄴ데요(\.|\?|!| |$)/g, replace: 'ㄴ데$1' },
            { pattern: /대요(\.|\?|!| |$)/g, replace: '대$1' },
            { pattern: /래요(\.|\?|!| |$)/g, replace: '래$1' }
        ];

        // 순서 중요: 형용사 예외 처리를 먼저 수행
        result = result.replace(adjRegex, '$1하다$2');
        
        // 형용사 '해요' 예외 처리 (필요해요 -> 필요하다)
        const adjRegex2 = new RegExp(`(${adjectives})해요(\\.|\\?|!| |$)`, 'g');
        result = result.replace(adjRegex2, '$1하다$2');

        const allRules = [...rules1, ...rules2, ...rules3, ...rules4];

        allRules.forEach(rule => {
            result = result.replace(rule.pattern, rule.replace);
        });

        // 6. '어요', '아요'
        result = result.replace(/([가-힣])어요(\.|\?|!| |$)/g, '$1다$2');
        result = result.replace(/([가-힣])아요(\.|\?|!| |$)/g, '$1다$2');

        // 7. 남은 요 제거
        result = result.replace(/([가-힣])요(\.|\?|!| |$)/g, (match, p1, p2) => {
            const exceptionChars = ['필', '중', '강', '개', '동']; 
            if (exceptionChars.includes(p1)) {
                return match; 
            }
            return p1 + p2;
        });

        return result;
    }

    convertBtn.addEventListener('click', () => {
        const inputText = inputElement.value;
        const convertedText = convertToBanmal(inputText);
        outputElement.value = convertedText;
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = outputElement.value;
        if (!textToCopy) return;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('복사되었습니다.');
        }).catch(err => {
            alert('복사 실패!');
        });
    });

    // 줄바꿈 제거기 로직
    const lbInputElement = document.getElementById('lb-input');
    const lbOutputElement = document.getElementById('lb-output');
    const lbConvertBtn = document.getElementById('lb-convert');
    const lbCopyBtn = document.getElementById('lb-copy');

    lbConvertBtn.addEventListener('click', () => {
        const text = lbInputElement.value;
        // 여러 줄바꿈과 2개 이상의 연속된 공백을 단일 공백으로 치환
        lbOutputElement.value = text.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    });

    lbCopyBtn.addEventListener('click', () => {
        const textToCopy = lbOutputElement.value;
        if (!textToCopy) return;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('복사되었습니다.');
        }).catch(err => {
            alert('복사 실패!');
        });
    });
});
