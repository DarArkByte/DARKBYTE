import { GradeRange } from '../types';

export function calculateGrade(totalScore: number, gradingSystem: GradeRange[]) {
  // If no grading system is defined, fall back to a standard WAEC A1-F9 scale
  const system = gradingSystem && gradingSystem.length > 0 
    ? gradingSystem 
    : [
        { label: 'A1', min: 75, max: 100, remark: 'Excellent' },
        { label: 'B2', min: 70, max: 74, remark: 'Very Good' },
        { label: 'B3', min: 65, max: 69, remark: 'Good' },
        { label: 'C4', min: 60, max: 64, remark: 'Credit' },
        { label: 'C5', min: 55, max: 59, remark: 'Credit' },
        { label: 'C6', min: 50, max: 54, remark: 'Credit' },
        { label: 'D7', min: 45, max: 49, remark: 'Pass' },
        { label: 'E8', min: 40, max: 44, remark: 'Pass' },
        { label: 'F9', min: 0, max: 39, remark: 'Fail' },
      ];

  // Find the matching band
  for (const band of system) {
    if (totalScore >= band.min && totalScore <= band.max) {
      return {
        grade: band.label,
        remark: band.remark,
        color: getColorForGrade(band.label)
      };
    }
  }

  // Fallback if score doesn't match any band (e.g. invalid score)
  return {
    grade: '-',
    remark: 'Ungraded',
    color: 'text-slate-400'
  };
}

function getColorForGrade(gradeLabel: string) {
  const label = gradeLabel.toUpperCase();
  if (label.startsWith('A')) return 'text-emerald-600';
  if (label.startsWith('B')) return 'text-blue-600';
  if (label.startsWith('C')) return 'text-indigo-600';
  if (label.startsWith('D') || label.startsWith('E')) return 'text-amber-600';
  if (label.startsWith('F')) return 'text-rose-600';
  
  // Generic fallback colors
  return 'text-slate-900';
}
