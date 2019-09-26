SELECT
	t_b_IDCard.f_CardNO AS cardNO,
	t_b_Consumer.f_ConsumerNO AS consumerNO,
	t_b_Consumer.f_ConsumerName AS consumerName,
	t_b_Group.f_GroupName AS groupName,
	t_d_CardRecord.f_ReadDate AS readDate,
	t_b_Reader.f_ReaderName AS readerName
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
WHERE (t_d_CardRecord.f_ReadDate BETWEEN #9/1/2019# AND #9/2/2019 23:59:59#)
ORDER BY t_d_CardRecord.f_ReadDate;
