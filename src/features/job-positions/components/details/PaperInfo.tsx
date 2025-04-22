import { Divider, Paper, Text, Title } from "@mantine/core";

export default function PaperInfo() {
  return (
    <Paper className="w-1/3" shadow="sm" p="lg" radius="md" withBorder>
      <Title>How does it work?</Title>
      <Divider my="md" />

      <Text>
        The chatbot will ask you questions similar to those you might receive in a real interview. Its answers
        and style adapt to yours, just as a human recruiter would. It is a safe environment where you can practice,
        make mistakes, improve and gain confidence.
      </Text>

      <Title mt="xl">What you need to know?</Title>
      <Divider my="md" />

      <Text>
        <Text span fw={700}>💬 Natural conversation:</Text> talk to the chatbot as if you were talking to a
        recruiter.
      </Text>
      <Text>
        <Text span fw={700}>🔒 Everything remains private:</Text> none of your answers will be shared. It's a
        protected and confidential
        environment.
      </Text>
      <Text>
        <Text span fw={700}>🎯 It's an exercise, not a test:</Text> there is no final score. The objective is to help
        you grow.
      </Text>
      <Text>
        <Text span fw={700}>📈 Useful feedback:</Text> at the end, you will receive suggestions on how to improve
        your answers.
      </Text>
    </Paper>
  );
}
