import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'

export const displayInterval = timeInterval => {
	switch (timeInterval) {
		case TODAY:
			return 'Today';
		case THIS_WEEK:
			return 'This Week';
		case THIS_MONTH:
			return 'This Month';
		case THIS_YEAR:
			return 'This Year';
		default:
			return null;
	}
}