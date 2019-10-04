module.exports = ({ startDate, endDate }) => {
	return `
		SELECT
			t_b_Consumer.f_ConsumerNO AS consumerNO,
			t_b_Consumer.f_ConsumerName AS consumerName,
			t_b_Group.f_GroupName AS groupName,
			t_d_CardRecord.f_ReadDate AS readDate
		FROM (
			t_b_Consumer
			INNER JOIN t_b_Group
			ON t_b_Consumer.f_GroupID = t_b_Group.f_GroupID
		)
		INNER JOIN t_d_CardRecord
		ON t_b_Consumer.f_ConsumerID = t_d_CardRecord.f_ConsumerID
		WHERE
			(t_d_CardRecord.f_ReadDate BETWEEN #${startDate}# AND #${endDate} 23:59:59#)
			AND (t_d_CardRecord.f_ReaderID BETWEEN 13 AND 16)
			AND (t_b_Consumer.f_GroupID = 7)
		ORDER BY t_d_CardRecord.f_ReadDate;
	`;
};
