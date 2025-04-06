/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  /**
   * Get a date range string from an array of date strings
   */
  export const getDateRange = (dates: string[]): string => {
    if (!dates || dates.length === 0) return '';
    
    // Sort dates
    const sortedDates = [...dates].sort();
    const firstDate = new Date(sortedDates[0]);
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);
    
    // If same month and year, show as "Apr 1-7, 2025"
    if (
      firstDate.getMonth() === lastDate.getMonth() && 
      firstDate.getFullYear() === lastDate.getFullYear()
    ) {
      return `${firstDate.toLocaleDateString('en-US', { month: 'short' })} ${firstDate.getDate()}-${lastDate.getDate()}, ${lastDate.getFullYear()}`;
    }
    
    // If different months or years, show as "Apr 1 - May 7, 2025"
    return `${formatDate(sortedDates[0])} - ${formatDate(sortedDates[sortedDates.length - 1])}`;
  };