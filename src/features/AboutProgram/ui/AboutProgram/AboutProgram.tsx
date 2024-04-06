import { Box, Container, Paper, Typography } from '@mui/material';
import { memo } from 'react';

interface AboutProgramProps {}

const AboutProgram = memo((props: AboutProgramProps) => {
  return (
    <Container sx={{ width: '500px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Система складского учета товарно-материальных ценностей в КГБПОУ
          «Зеленогорский техникум промышленных технологий и сервиса»
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Версия 1.0.0
        </Typography>
        <Typography variant="body1" paragraph>
          Приложение складского учета предназначено для учета объектов в
          техникуме. Оно облегчает процесс отслеживания и управления запасами
          объектов, обеспечивая более эффективное управление инвентарем.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 Система складского учета товарно-материальных ценностей в
          КГБПОУ «ЗТПТиС». Все права защищены.
        </Typography>
      </Paper>
    </Container>
  );
});

export default AboutProgram;
