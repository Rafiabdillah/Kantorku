import React from 'react';
import { CharacterId, CharacterExpression } from '../../types';

interface CharacterAvatarProps {
  id: CharacterId | 'player';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: CharacterExpression;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  id,
  size = 'md',
  expression = 'normal',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const getColors = () => {
    switch (id) {
      case 'sari':
        return { skin: '#FAD2B8', hair: '#2D3748', shirt: '#047857', collar: '#FFFFFF', glasses: true };
      case 'dimas':
        return { skin: '#FCD7B6', hair: '#7C2D12', shirt: '#F59E0B', collar: '#FEF3C7', glasses: false };
      case 'maya':
        return { skin: '#FCE7DF', hair: '#831843', shirt: '#E11D48', collar: '#FFE4E6', glasses: false };
      case 'intan':
        return { skin: '#FBD5B5', hair: '#1E1B4B', shirt: '#4F46E5', collar: '#EEF2FF', glasses: true };
      case 'reza':
        return { skin: '#FAD2B8', hair: '#334155', shirt: '#1D4ED8', collar: '#EFF6FF', glasses: true };
      case 'hendra':
        return { skin: '#ECD8C7', hair: '#475569', shirt: '#6B21A8', collar: '#F3E8FF', glasses: true };
      case 'nadia':
        return { skin: '#FEE2D5', hair: '#701A75', shirt: '#C026D3', collar: '#FDF4FF', glasses: false };
      case 'player':
      default:
        return { skin: '#FBD5B5', hair: '#374151', shirt: '#2563EB', collar: '#DBEAFE', glasses: false };
    }
  };

  const { skin, hair, shirt, collar, glasses } = getColors();

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 bg-slate-100 ${sizeMap[size]} ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circle */}
        <circle cx="50" cy="50" r="50" fill="#F1F5F9" />

        {/* Body / Shoulders */}
        <path d="M20 92 C20 72, 35 68, 50 68 C65 68, 80 72, 80 92 Z" fill={shirt} />
        {/* Collar / Tie */}
        <path d="M42 68 L50 78 L58 68 Z" fill={collar} />
        <path d="M47 78 L53 78 L51 90 L49 90 Z" fill="#991B1B" opacity="0.8" />

        {/* Head / Neck */}
        <rect x="44" y="52" width="12" height="14" rx="3" fill={skin} />
        <ellipse cx="50" cy="42" rx="22" ry="24" fill={skin} />

        {/* Hair */}
        {id === 'sari' && (
          <path d="M26 40 C26 22, 74 22, 74 40 C74 44, 70 34, 50 30 C30 34, 26 44, 26 40 Z" fill={hair} />
        )}
        {id === 'dimas' && (
          <path d="M26 36 C28 20, 72 20, 74 36 C66 26, 45 24, 26 36 Z" fill={hair} />
        )}
        {id === 'maya' && (
          <path d="M25 45 C25 20, 75 20, 75 45 C78 55, 74 65, 72 65 C70 50, 68 32, 50 30 C32 32, 30 50, 28 65 C26 65, 22 55, 25 45 Z" fill={hair} />
        )}
        {id === 'intan' && (
          <path d="M26 42 C26 22, 74 22, 74 42 C72 32, 60 26, 50 26 C40 26, 28 32, 26 42 Z" fill={hair} />
        )}
        {(id === 'reza' || id === 'hendra') && (
          <path d="M27 38 C30 24, 70 24, 73 38 C68 28, 55 26, 50 26 C45 26, 32 28, 27 38 Z" fill={hair} />
        )}
        {id === 'nadia' && (
          <path d="M24 45 C24 20, 76 20, 76 45 C78 60, 74 68, 72 68 C70 52, 68 30, 50 28 C32 30, 30 52, 28 68 C26 68, 22 60, 24 45 Z" fill={hair} />
        )}
        {id === 'player' && (
          <path d="M28 36 C30 20, 70 20, 72 36 C65 26, 48 24, 28 36 Z" fill={hair} />
        )}

        {/* 7 Facial Expressions Logic */}
        {expression === 'proud' ? (
          // Proud eyes (happy arcs)
          <g stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M38 43 Q42 39 46 43" />
            <path d="M54 43 Q58 39 62 43" />
          </g>
        ) : expression === 'surprised' ? (
          // Surprised wide eyes
          <g>
            <circle cx="42" cy="42" r="3.6" fill="#1E293B" />
            <circle cx="58" cy="42" r="3.6" fill="#1E293B" />
            <circle cx="43" cy="41" r="1.2" fill="#FFFFFF" />
            <circle cx="59" cy="41" r="1.2" fill="#FFFFFF" />
          </g>
        ) : (
          // Normal, Thinking, Stern, Confused eyes
          <g>
            <circle cx="42" cy="42" r="2.8" fill="#1E293B" />
            <circle cx="58" cy="42" r="2.8" fill="#1E293B" />
            <circle cx="43" cy="41" r="0.8" fill="#FFFFFF" />
            <circle cx="59" cy="41" r="0.8" fill="#FFFFFF" />
          </g>
        )}

        {/* Eyebrows per Expression */}
        {expression === 'stern' ? (
          // Stern downward angled eyebrows
          <g stroke="#334155" strokeWidth="2" fill="none" strokeLinecap="round">
            <line x1="37" y1="34" x2="47" y2="38" />
            <line x1="63" y1="34" x2="53" y2="38" />
          </g>
        ) : expression === 'confused' ? (
          // Confused uneven eyebrows
          <g stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round">
            <path d="M37 34 Q42 32 46 34" />
            <path d="M54 38 Q58 36 62 38" />
          </g>
        ) : expression === 'thinking' ? (
          <g stroke="#334155" strokeWidth="1.8" fill="none" strokeLinecap="round">
            <line x1="38" y1="34" x2="46" y2="32" />
            <line x1="54" y1="36" x2="62" y2="36" />
          </g>
        ) : (
          <g stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round">
            <path d="M38 36 Q42 34 46 36" />
            <path d="M54 36 Q58 34 62 36" />
          </g>
        )}

        {/* Glasses */}
        {glasses && (
          <g stroke="#334155" strokeWidth="1.5" fill="none">
            <rect x="36" y="37" width="12" height="9" rx="2" fill="#E2E8F0" fillOpacity="0.25" />
            <rect x="52" y="37" width="12" height="9" rx="2" fill="#E2E8F0" fillOpacity="0.25" />
            <line x1="48" y1="41" x2="52" y2="41" />
          </g>
        )}

        {/* Mouth Rendering */}
        {expression === 'happy' || expression === 'proud' ? (
          <path d="M43 49 Q50 57 57 49" stroke="#991B1B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        ) : expression === 'surprised' ? (
          <ellipse cx="50" cy="52" rx="3" ry="4" fill="#991B1B" />
        ) : expression === 'stern' ? (
          <line x1="44" y1="52" x2="56" y2="52" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" />
        ) : expression === 'confused' ? (
          <path d="M44 52 Q47 50 50 53 Q53 56 56 52" stroke="#991B1B" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : expression === 'thinking' ? (
          <path d="M46 52 Q50 49 54 52" stroke="#991B1B" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M45 51 Q50 54 55 51" stroke="#991B1B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}

        {/* Blush cheeks */}
        <circle cx="36" cy="46" r="3" fill="#F43F5E" opacity="0.25" />
        <circle cx="64" cy="46" r="3" fill="#F43F5E" opacity="0.25" />
      </svg>
    </div>
  );
};
