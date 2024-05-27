import { useState } from "react";
import { Container, VStack, HStack, Box, Textarea, Button, Text, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([{ content: newPost, reactions: { thumbsUp: 0, heart: 0, laugh: 0 } }, ...posts]);
      setNewPost("");
    }
  };

  const handleReaction = (index, reaction) => {
    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} width="100%">
        <Textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handlePostSubmit}>
          Post
        </Button>
        <VStack spacing={4} width="100%">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text mb={2}>{post.content}</Text>
              <HStack spacing={4}>
                <IconButton
                  aria-label="Thumbs Up"
                  icon={<FaThumbsUp />}
                  onClick={() => handleReaction(index, "thumbsUp")}
                />
                <Text>{post.reactions.thumbsUp}</Text>
                <IconButton
                  aria-label="Heart"
                  icon={<FaHeart />}
                  onClick={() => handleReaction(index, "heart")}
                />
                <Text>{post.reactions.heart}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => handleReaction(index, "laugh")}
                />
                <Text>{post.reactions.laugh}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;