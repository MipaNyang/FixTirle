/*
!!!!! Super Thanks wsbimango !!!!!
CustomTag by Mipa(@mipa_official) https://discord.gg/6Ckv4mbD7H
*/

import "./Impl"

use("./Proxies/Unity", "LevelData", "ArtistRaw", "TitleRaw", "AuthorRaw");

let currentScene;

const getFixArtist = () => fixLegacyArtist(cleanText(ArtistRaw(), false));
const getFixTitle = () => fixLegacyTitle(cleanText(TitleRaw(), false))
const getFixAuthor = () => fixLegacyAuthor(cleanText(AuthorRaw(), false))

const getFixColorArtist = () => fixLegacyArtist(cleanText(ArtistRaw(), true));
const getFixColorTitle = () => fixLegacyTitle(cleanText(TitleRaw(), true));
const getFixColorAuthor = () => fixLegacyAuthor(cleanText(AuthorRaw(), true));

// const getFullCaption = () => fixLegacyFullCaption(LevelData() ? cleanText(LevelData().fullCaption, false) : null);
const getFullCaption = () => fixLegacyFullCaption(LevelData() ? cleanText(LevelData().fullCaption, false) : null);
const getColorFullCaption = () => getFixAuthor() === "ADOFAI Official Level" ? `${getFixColorArtist()} ${getFixColorTitle()}` : `${getFixColorArtist()} - ${getFixColorTitle()}`

On.rewind(() => {
    updateCurrentScene();
});

const sizeRegex = /<size=[^>]*>|<\/size>/gi;
const lineBreakRegex = /[\n\r]/g;
const invalidColorRegex = /<color=#([0-9A-Za-z]{1,5}|[0-9A-Za-z]{7}|[0-9A-Za-z]{9,})>/gi;
const invisibleColorRegex = /<color=#[0-9A-Za-z]{6}00>/gi;
const withQuotesColorRegex = /<color=["']#([0-9A-Za-z]{1,8})["']>/gi;

const removeColor = (str) =>
    str.replace(/<color=[^>]*>|<\/color>/gi, "");

const fixColor = (str) =>
    str
        .replace(withQuotesColorRegex, "<color=#$1>")
        .replace(invalidColorRegex, "")
        .replace(invisibleColorRegex, "");

function cleanText(str, isColored) {
    if (!str) return "";

    str = str.replace(lineBreakRegex, " ")
        .replace(sizeRegex, "")
        .replace(/\s+/g, " ")
        .trim();

    return isColored ? fixColor(str) : removeColor(str);
}

function defaultFunc(value) {
    updateCurrentScene();
    checkFor_XI_XM_XS_Scenes();

    return value;
}

const fixLegacyArtist = artist => currentScene in levels
    ? currentScene in taroEXLevels
        ? taroEXLevels[currentScene]
        : currentScene
    : artist;

const fixLegacyTitle = title => currentScene in levels
    ? levels[currentScene].length === 2
        ? levels[currentScene][getLanguage() === 23 ? 1 : 0]
        : levels[currentScene][0]
    : title;

const fixLegacyAuthor = author => currentScene in levels
    ? "ADOFAI Official Level"
    : author;

const fixLegacyFullCaption = fullCaption => getFixAuthor() === "ADOFAI Official Level"
    ? `${getFixColorArtist()} ${getFixColorTitle()}` :
    currentScene in levels
        ? `${getFixArtist()} - ${getFixTitle()}`
        : fullCaption

const checkFor_XI_XM_XS_Scenes = () => currentScene =
    currentScene === 'scnGame'
        ? (getFullCaption().split(' ')[0] in levels
            ? getFullCaption().split(' ')[0]
            : 'scnGame')
        : currentScene;

const updateCurrentScene = () => currentScene = SceneManager.GetActiveScene().name;

const levels = {
    "1-1": ["Playing it Straight", "가장 기본적인 것부터"],
    "1-2": ["Z-Bend", "Z 굴곡"],
    "1-3": ["S-Bend", "S 굴곡"],
    "1-4": ["More Bends", "더 많은 굴곡"],
    "1-5": ["Turn Up", "볼륨 높이고!"],
    "1-6": ["Get Ready", "준비되셨나요?"],
    "1-X": ["A Dance of Fire and Ice"],
    "2-1": ["North and South are Always Off Beat", "위쪽과 아래쪽은 항상 엇박입니다"],
    "2-2": ["Big Stpe", "난이도를 높여볼까요?"],
    "2-3": ["Upbeat", "약박"],
    "2-X": ["Offbeats"],
    "3-1": ["Three Point Turns", "유턴"],
    "3-2": ["More Three Point Turns", "유턴 받고 유턴 더"],
    "3-3": ["Serpentine", "구불구불"],
    "3-4": ["SSSSSS", "구불구불구불구불"],
    "3-5": ["More SSSSSS", "구불구불구불구불구불구불구불구불"],
    "3-6": ["These Tutorials Are Inadeqate for What's Coming, Forgive Me", "이걸로도 설명이 좀 모자란 감이 있는데 양해 부탁드려요"],
    "3-X": ["THE WIND UP"],
    "4-1": ["Sixteenths", "16분박"],
    "4-2": ["Tresillos", "트레실로"],
    "4-3": ["Spaghetti", "스파게티"],
    "4-4": ["Triangles Are Triplts", "삼각형과 셋잇단"],
    "4-5": ["Triplets and a Breakbeat", "셋잇단과 쉬어가는 박"],
    "4-X": ["Love Letters"],
    "5-1": ["Skewed Step", "경사진 길"],
    "5-2": ["Bigger Skewed Step", "더 길게 경사진 길"],
    "5-3": ["Cliffhanger", "긴장감을 조금 보태보죠"],
    "5-4": ["Skewed Loops", "경사진 꼬인 길"],
    "5-X": ["The Midnight Train"],
    "6-1": ["Good Luck", "행운을 빕니다"],
    "6-2": ["Inverse Kinks", "반대로 꼬아봅시다"],
    "6-3": ["Fun with Irregular Time", "변박자와 즐거운 한때"],
    "6-4": ["SSSSSS Returns", "구불구불의 재림"],
    "6-X": ["PULSE"],
    "B-1": ["Speed Trial", "어마어마하게 빨라져요!"],
    "B-X": ["Thanks For Playing My Game"],
    "7-1": ["Swirly Serpentines", "소용돌이치는 구불한 길"],
    "7-2": ["Swirly SSSSSS", "소용돌이치는 구불구불구불구불한 길"],
    "7-3": ["Inside spin, Outside spin", "안쪽 회전, 바깥쪽 회전"],
    "7-4": ["Offbeats Spin", "엇박 회전"],
    "7-5": ["Extravagant Spin", "요상한 회전"],
    "7-X": ["Spin 2 Win"],
    "8-1": ["Remember SKewed Steps?", "경사진 길, 기억하시나요?"],
    "8-2": ["Skewed Loop Climb", "꼬인 오르막길"],
    "8-3": ["Funky Break", "펑키한 브레이크"],
    "8-4": ["Introducing Hexagons", "육각형을 소개합니다"],
    "8-5": ["Square Wave", "네모난 파도"],
    "8-6": ["The Sea Serpent", "바다뱀"],
    "8-7": ["Saxophone", "색소폰"],
    "8-8": ["Hexagon Hill", "육각형 언덕"],
    "8-X": ["Jungle City"],
    "9-1": ["Warped Loops", "비뚤어진 꼬인 길"],
    "9-2": ["Boomerang", "부메랑"],
    "9-3": ["Coil", "코일"],
    "9-4": ["The Beast with Many Eyes", "여러 개의 눈을 가진 괴물"],
    "9-5": ["ZZZZZZ"],
    "9-X": ["Classic Pursuit"],
    "10-1": ["Trapezoid", "사다리꼴"],
    "10-2": ["Trapezoid Twist", "뒤틀린 사다리꼴"],
    "10-3": ["Half-Octagons", "반 팔각형"],
    "10-4": ["Octagon Stairs", "팔각형 계단"],
    "10-5": ["Half-Octagon Swing", "반 팔각형 계단"],
    "10-6": ["Dizzy Octagons", "어지러운 팔각형"],
    "10-7": ["Full Octagon", "팔각형"],
    "10-8": ["Snails and Rabbits", "달팽이와 토끼"],
    "10-X": ["Butterfly Planet"],
    "11-1": ["Helix", "나선"],
    "11-2": ["Wild Spaghetti", "어지럽게 꼬인 길"],
    "11-3": ["Octopi", "문어"],
    "11-4": ["Slow Motion Turns", "슬로우 모션"],
    "11-5": ["The Starship Fleet", "우주선 함대"],
    "11-6": ["Weaved Hearts", "엮인 하트"],
    "11-X": ["Heracles"],
    "12-1": ["Behold, the Right Triangle", "직각 삼각형"],
    "12-2": ["Rooftops", "옥상"],
    "12-3": ["Satellite Dishes", "위선 안테나"],
    "12-4": ["Triangles in Tresillos", "트레실로와 삼각형"],
    "12-5": ["Lions' Tails", "사자 꼬리"],
    "12-6": ["The Shielded Sentinels", "방패를 든 감시병"],
    "12-X": ["Artificial Chariot"],
    "XF-1": ["Upbeats Again", "또 약박"],
    "XF-2": ["North and South Are Now On-Beat", "이제 윗길과 아랫길이 정박입니다"],
    "XF-3": ["Bass Solo Tangle", "뒤엉킨 베이스 솔로"],
    "XF-X": ["Third Wave Flip-Flop"],
    "XC-1": ["Snail Breaks", "변속에 주의하세요"],
    "XC-2": ["Drop-in Loops", "급경사 회전"],
    "XC-3": ["Crumbling Boxes", "커다란 회전"],
    "XC-4": ["Spiky Ladder", "뾰족한 오르막길"],
    "XC-5": ["For Added Flavor. Add Loops", "회전타일도 넣어보죠"],
    "XC-X": ["Credits"],
    "XH-1": ["Trust Your Ears, Not Your Eyes", "눈을 믿지 말고 귀를 믿으세요"],
    "XH-2": ["The Praying Statues", "기도하는 조각상"],
    "XH-3": ["7-Hit Combo", "7 콤보"],
    "XH-X": ["Final Hope"],
    "PA-1": ["Introducing Midspin Tiles", "미드스핀을 소개합니다"],
    "PA-X": ["Distance"],
    "XR-1": ["Flags and Squares of the old town", "거꾸로 수박바"],
    "XR-2": ["Right Triangle Dance", "직각 삼각형의 춤"],
    "XR-3": ["Climbing Over the City Walls", "성벽 등반"],
    "XR-X": ["Rose Garden"],
    "RJ-1": ["Trickle Down", "리듬의 흐름"],
    "RJ-2": ["Two-Button Rhythm Game", "두 개의 키로 즐기는 리듬게임"],
    "RJ-3": ["Stomp Breaks", "몰아치는 브레이크"],
    "RJ-4": ["In The Loop", "고리 속에서"],
    "RJ-5": ["The Loop's Brother", "고리 속에서 (심화편)"],
    "RJ-6": ["Lattice", "격자"],
    "RJ-7": ["Fish Hooks", "낚싯바늘"],
    "RJ-X": ["Fear Grows"],
    "XN-1": ["Waves of the Astral Shore", "별빛 해안의 파도"],
    "XN-2": ["Cosmic Honeycomb", "우주적 벌집"],
    "XN-3": ["The Fuzzy Snake", "엉성한 뱀 똬리"],
    "XN-X": ["Trans-Neptunian Object"],
    "XM-1": ["Hello Again, Midspin Tiles", "다시 만나는 미드스핀 타일"],
    "XM-2": ["Spiky Tresillos", "뾰족한 트레실로"],
    "XM-3": ["Flamingos", "홍학"],
    "XM-4": ["Turnarounds and Midspin", "유턴과 미드스핀의 춤"],
    "XM-X": ["Miko Skip"],
    "XS-1": ["Trapezoidal Loops", "사다리꼴 루프"],
    "XS-2": ["Squares and Rectangles", "정사각형과 직사각형"],
    "XS-3": ["Outside Triangles", "삼각형의 바깥쪽"],
    "XS-4": ["Right angles at all angles", "취중 탱고"],
    "XS-5": ["Grapevine", "포도덩굴"],
    "XS-6": ["Hexagonal Staircase", "육각형 계단"],
    "XS-7": ["The Return of the Crumbling Boxes", "무너져가는 상자의 메아리"],
    "XS-8": ["Diving Sea Serpent", "잠수하는 바다뱀"],
    "XS-X": ["Party of spirits"],
    "XO-1": ["U-turn Road", "유턴 타일"],
    "XO-2": ["Back-to-back Loops", "계속 이어지는 회전"],
    "XO-X": ["One Forgotten Night"],
    "XT-1": ["Diamonds", "다이아몬드"],
    "XT-2": ["Swans", "백조"],
    "XT-3": ["Fasr Lanes", "빠른 길"],
    "XT-4": ["Elevators", "엘리베이터"],
    "XT-5": ["Elevator Dance", "엘리베이터 안에서 춤을"],
    "XT-6": ["Unlimaited Flexibility", "끝없는 유연성"],
    "XT-7": ["Pentagons!?", "오각형!?"],
    "XT-8": ["The Drunken Python", "취한 뱀"],
    "XT-X": ["Options"],
    "XI-1": ["Winding Path", "미로처럼 얽힌 길"],
    "XI-2": ["Chaotic Descent", "혼란스러운 하강"],
    "XI-3": ["Turnaround Ladder", "돌아 오르는 길"],
    "XI-4": ["Hexagonal Bends", "육각과 사각의 커브"],
    "XI-5": ["Quick Rhythm Switchup", "좀 더 빠르게"],
    "XI-6": ["Twirl Ladders", "소용돌이 사다리"],
    "XI-7": ["Rapidfire Bends", "속사포 커브"],
    "XI-X": ["It Go"],
    "MN-1": ["Lampposts", "가로등"],
    "MN-2": ["Treehouses", "나무 위의 집"],
    "MN-3": ["Beanstalk", "콩나무 줄기"],
    "MN-4": ["Olive Branch", "올리브 가지"],
    "MN-X": ["Night Wander (cnsouka Remix)"],
    "ML-1": ["Wineglasses", "와인잔"],
    "ML-2": ["BBBB", "BBBB"],
    "ML-3": ["Crooked Trees", "덩굴손"],
    "ML-4": ["Triangle Stack", "쌓인 삼각형"],
    "ML-5": ["Toppled Triangle Staircase", "삼각형과 계단"],
    "ML-6": ["Abstract Art Gallery", "추상 미술관"],
    "ML-7": ["Totem Poles", "솟대"],
    "ML-X": ["La nuit de vif"],
    "MO-1": ["Triangle Run", "빠른 삼각형"],
    "MO-2": ["Triplet Shimmy", "드르륵 드르륵 드르륵"],
    "MO-3": ["Countdown Sqares", "카운트다운과 다중 사각형"],
    "MO-X": ["EMOMOMO"],
    "T1-1": ["Introducing The Hold", "홀드를 소개합니다"],
    "T1-2": ["Catch and Release!", "잡을 때와 놔줄 때"],
    "T1-3": ["Back to Back Holds", "반복 홀드"],
    "T1-4": ["Vertical Hold", "세로 홀드"],
    "T2-1": ["Dotted Climb", "점분음표 상승"],
    "T2-2": ["Cold Step Climb", "느린 상승"],
    "T2-3": ["Hot Step Climb", "빠른 상승"],
    "T2-4": ["The Cubicle", "좁은 방"],
    "T2-5": ["Sixteenths After Holds", "홀드 후 16분음"],
    "T2-6": ["Dotted Spring", "늘어진 스프링"],
    "T2-7": ["Cold Shuriken", "차가운 수리검"],
    "T2-8": ["Hot Shuriken", "뜨거운 수리검"],
    "T2-9": ["Midspin Polyrhythm", "미드스핀 폴리리듬"],
    "T2-X": ["sing sing <color=#6c2f33>red</color> <color=#2a3686>indigo</color>"],
    "T3-1": ["OK Maybe One Hint Here", "힌트 하나 정도는 드릴게요"],
    "T3-X": ["No Hints Here!", "힌트 없음!!"],
    "T4-1": ["The J", "J"],
    "T4-2": ["Climbing Hills With Trills", "트릴과 함께하는 등산"],
    "T4-3": ["Hot & Cold High Fives", "빠르고 느린 하이파이브"],
    "T4-4": ["Rhythm Gaming", "리듬 게이밍"],
    "T4-5": ["Ah, The Scalene Triangle", "부등변 삼각형"],
    "T4-6": ["Seeing Triple", "몰아치는 삼연음"],
    "T4-7": ["Offbeat are Slopes!", "이제 대각선이 약박입니다!"],
    "T4-8": ["Staggered Climb", "비뚤어진 등반"],
    "T4-9": ["Pointing the Finger", "가리키는 손가락"],
    "T4-10": ["Large Samosa", "거대한 삼각김밥"],
    "T4-11": ["Inverted Samosa", "뒤집힌 삼각김밥"],
    "T4-12": ["Good luck", "행운을 빕니다"],
    "T4-X": ["Third Sun"],
    "T5-1": ["Big Zag", "큰 지그재그"],
    "T5-2": ["To Three To Two", "3과 2의 왕복"],
    "T5-3": ["Place of Interest", "루프 사각형"],
    "T5-4": ["My New Updated Maze (final) (1)", "미로 최신 버전 (최종) (진짜최종) (1)"],
    "T5-5": ["A Final Warning", "마지막 경고"],
    "T5-X": ["Divine Intervention"],
    "T1EX-1": ["Catch and Release, Sixteenths!", "잡을 때와 놔줄 때 (심화편)"],
    "T1EX-2": ["Island Hopping", "도약"],
    "T1EX-3": ["No Holds Barred!", "홀드가 무제한!"],
    "T1EX-4": ["Starship Hopping", "우주선과 도약"],
    "T1EX-X": ["NEW LIFE"],
    "T2EX-1": ["The Cubicle Refresher Course", "좁은 방, 복습시간"],
    "T2EX-2": ["Rhythm Reader", "리듬 판독기"],
    "T2EX-3": ["Lights out!", "소등 시간"],
    "T2EX-4": ["Final Exam", "마지막 시험"],
    "T2EX-X": ["sing sing <color=#6c2f33>red</color> <color=#2a3686>indigo</color>"],
    "T3EX-X": ["No Hints Here!", "힌트 없음!!"],
    "T4EX-1": ["Scalene Hot Step", "빠른 부등변 삼각형"],
    "T4EX-2": ["Speedy Three Point Turns", "빠른 유턴"],
    "T4EX-3": ["Bowtie Pasta", "파르팔레 파스타"],
    "T4EX-4": ["Homemade Pretzel", "수제 파르첼"],
    "T4EX-X": ["Third Sun"],
};

const taroEXLevels = {
    "T1EX-X": "T1-EX",
    "T2EX-X": "T2-EX",
    "T3EX-X": "T3-EX",
    "T4EX-X": "T4-EX",
};

registerTag("Debug", () => defaultFunc(currentScene));
registerTag("GetActiveScene", () => SceneManager.GetActiveScene().name, true);

registerTag("FixArtist", () => defaultFunc(getFixArtist()));
registerTag("FixTitle", () => defaultFunc(getFixTitle()));
registerTag("FixAuthor", () => defaultFunc(getFixAuthor()));
registerTag("Fullcaption", () => defaultFunc(getFullCaption()));

registerTag("FixColorArtist", () => defaultFunc(getFixColorArtist()));
registerTag("FixColorTitle", () => defaultFunc(getFixColorTitle()));
registerTag("FixColorAuthor", () => defaultFunc(getFixColorAuthor()));
registerTag("ColorFullcaption", () => defaultFunc(getColorFullCaption()));