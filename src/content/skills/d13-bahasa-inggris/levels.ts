export interface D13Level { id:string; domainId:'D13'; skillId:string; tier:number; title:string; subtitle:string; description:string; engine:'advanced-quiz-engine'; timeLimitSeconds:number; passThreshold:number }
export const D13_LEVELS:D13Level[]=[
 {id:'D13-LEVEL-01',domainId:'D13',skillId:'D13-SKILL-01',tier:1,title:'Rapat Dasar',subtitle:'Meeting English dasar',description:'Pilih ungkapan rapat yang paling tepat.',engine:'advanced-quiz-engine',timeLimitSeconds:300,passThreshold:70},
 {id:'D13-LEVEL-02',domainId:'D13',skillId:'D13-SKILL-02',tier:2,title:'Email Profesional',subtitle:'Write concise emails',description:'Susun email bisnis yang jelas dan sopan.',engine:'advanced-quiz-engine',timeLimitSeconds:300,passThreshold:70},
 {id:'D13-LEVEL-03',domainId:'D13',skillId:'D13-SKILL-03',tier:3,title:'Presentasi Bisnis',subtitle:'Structure your presentation',description:'Latih signposting dan jawaban singkat.',engine:'advanced-quiz-engine',timeLimitSeconds:360,passThreshold:80},
 {id:'D13-LEVEL-04',domainId:'D13',skillId:'D13-SKILL-02',tier:4,title:'Komunikasi Terintegrasi',subtitle:'Integrated workplace communication',description:'Gabungkan rapat, email, dan presentasi.',engine:'advanced-quiz-engine',timeLimitSeconds:420,passThreshold:80}
];
