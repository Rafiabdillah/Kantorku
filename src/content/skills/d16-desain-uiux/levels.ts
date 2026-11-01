export interface D16Level{id:string;domainId:'D16';skillId:string;tier:number;title:string;subtitle:string;description:string;engine:'advanced-quiz-engine';timeLimitSeconds:number;passThreshold:number}
export const D16_LEVELS:D16Level[]=[
 {id:'D16-LEVEL-01',domainId:'D16',skillId:'D16-SKILL-01',tier:1,title:'Audit Kontras Dasar',subtitle:'Calculate WCAG contrast',description:'Bandingkan warna teks dan latar fiktif.',engine:'advanced-quiz-engine',timeLimitSeconds:300,passThreshold:70},
 {id:'D16-LEVEL-02',domainId:'D16',skillId:'D16-SKILL-02',tier:2,title:'Layout Aksesibel',subtitle:'Structure a readable interface',description:'Susun hierarchy, spacing, dan focus order.',engine:'advanced-quiz-engine',timeLimitSeconds:300,passThreshold:70},
 {id:'D16-LEVEL-03',domainId:'D16',skillId:'D16-SKILL-03',tier:3,title:'State dan Feedback',subtitle:'Design resilient interactions',description:'Nilai fokus, error, hover, dan sukses.',engine:'advanced-quiz-engine',timeLimitSeconds:360,passThreshold:80},
 {id:'D16-LEVEL-04',domainId:'D16',skillId:'D16-SKILL-01',tier:4,title:'Review UI Terintegrasi',subtitle:'Integrated accessibility review',description:'Gabungkan kontras, layout, dan feedback.',engine:'advanced-quiz-engine',timeLimitSeconds:420,passThreshold:80}
];
