import React, { useState } from "react";
import {
  Text
} from "native-base";

function Comment_Share({comment, share}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Text
      variant="ghost"
      px="5"
      mb="2"
      mt="2"
      fontSize="15"      
      _text={{
        color: "coolGray.800",
      }}
    >
      {(comment > 0) &&  <Text> {comment} bình luận </Text>} | {(share > 0) && <Text> {share} lượt chia sẻ</Text>}
    </Text>
  );
}

export default React.memo(Comment_Share);
