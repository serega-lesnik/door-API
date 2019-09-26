SELECT
	t_b_IDCard.f_CardNO,
	t_b_Consumer.f_ConsumerNO,
	t_b_Consumer.f_ConsumerName,
	t_b_Group.f_GroupName,
	t_d_CardRecord.f_ReadDate,
	t_b_Reader.f_ReaderName
FROM (
	(
		(
			t_b_IDCard
			INNER JOIN t_b_Consumer
			ON t_b_IDCard.f_ConsumerID = t_b_Consumer.f_ConsumerID
		)
		INNER JOIN t_b_Group
		ON t_b_Consumer.f_GroupID = t_b_Group.f_GroupID
	)
	INNER JOIN t_d_CardRecord
	ON t_b_Consumer.f_ConsumerID = t_d_CardRecord.f_ConsumerID
)
INNER JOIN t_b_Reader
ON t_d_CardRecord.f_ReaderID = t_b_Reader.f_ReaderID
ORDER BY t_d_CardRecord.f_ReadDate;
