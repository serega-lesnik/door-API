SELECT
	t_b_IDCard.f_CardNO,
	t_b_Consumer.f_ConsumerNO,
	t_b_Consumer.f_ConsumerName,
	t_b_Group.f_GroupName,
	-- FormatDateTime([t_d_CardRecord.f_ReadDate],2) AS DateOnly,
	Min(f_ReadDate) AS StartTime,
	Max(f_ReadDate) AS EndTime,
	-- DateDiff("n", Min(f_ReadDate), Max(f_ReadDate)) AS DiffDate
FROM
	(
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
WHERE (((t_d_CardRecord.f_ReadDate) Between #9/1/2019# And #9/2/2019 23:59:59#))
GROUP BY
	t_b_IDCard.f_CardNO,
	t_b_Consumer.f_ConsumerNO,
	t_b_Consumer.f_ConsumerName,
	t_b_Group.f_GroupName,
	FormatDateTime([t_d_CardRecord.f_ReadDate],2)
HAVING (((FormatDateTime([t_d_CardRecord.f_ReadDate],2))>#9/1/2019#)) OR (((FormatDateTime([t_d_CardRecord.f_ReadDate],2))<#9/30/2019#))
ORDER BY FormatDateTime([t_d_CardRecord.f_ReadDate],2);




