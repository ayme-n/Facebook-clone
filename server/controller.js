const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


exports.signup = async (req,res)=> {

    const {username,password,name,email,gender,birthday} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);
 
    try{
        const NewUser = await prisma.user.create({
        data : {username,password : hashedPassword,name,email,gender,birthday}
    })

    res.status(200).json({
        NewUser 
    })
   
    }
    catch(err){
        res.status(401).json({error : "username or email already exist ! "})
    }

    
};

exports.friends = async (req, res) => {
  const { id } = req.params;

  const friends = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      friendsA: true,
      friendsB: true,
    },
  });

  // Merge both relations
  let AllFriends = [...(friends.friendsA || []), ...(friends.friendsB || [])];

  // Deduplicate by id
  const uniqueFriends = Array.from(
    new Map(AllFriends.map(f => [f.id, f])).values()
  );

  res.status(200).json({
    Friends: uniqueFriends,
  });
};


exports.friend_add = async (req,res)=> {

    const {id} = req.params
    const {FriendID}=req.body
 
    const user = await prisma.user.update({
        where : {
            id : parseInt(id,10)
        },
        data : {
            friendsA : {
                connect : {id : parseInt(FriendID)}
            }
        },
        include : {
            friendsA:true,friendsB:true
        }
    })
   
    res.status(200).json({
        user 
    })
};





exports.comment_add = async (req,res)=> {

    const {id} = req.params
    const {text,CommenterID}=req.body
 
    const comment = await prisma.comment.create({

        data : {
            text,
            CommenterID : parseInt(CommenterID,10),
            PostID : parseInt(id,10)
        }
    })
   
    res.status(200).json({
        comment 
    })
};


exports.post_add = async (req,res)=> {

    const {id} = req.params
    const {text}=req.body
 
    const post = await prisma.post.create({

        data : {
            text,
            PosterID : parseInt(id,10)
        }
    })
   
    res.status(200).json({
        post 
    })
};


exports.requests_sent = async (req,res)=> {

    const {id} = req.params
 
    const requests = await prisma.request.findMany({
        where : {
            SenderID : parseInt(id,10)
        },
        include : {
            Sender:true,Receiver:true
        }
    })

    res.status(200).json({
        requests
    })
};

exports.requests_received = async (req,res)=> {

    const {id} = req.params
 
    const requests = await prisma.request.findMany({
        where : {
            ReceiverID : parseInt(id,10)
        },
        include : {
            Sender:true,Receiver:true
        }
    })

    res.status(200).json({
        requests
    })
};

exports.request_delete = async (req,res)=> {

    const {id} = req.params
 
    const request = await prisma.request.delete({
        where : {
            id : parseInt(id,10) 
        }
    })

    res.status(200).json({
        request
    })
};

exports.request_add = async (req,res)=> {

    const {MyID,friend_id} = req.body
 
    const request = await prisma.request.create({
        data : {
            SenderID:parseInt(MyID,10),
            ReceiverID:parseInt(friend_id,10)
        }
    })

    res.status(200).json({
        request
    })
};

exports.post_like = async (req,res)=> {

    const {id} = req.params

    const {MyID} = req.body

    const exist = await prisma.like.findFirst({
        where : {
            PostID : parseInt(id,10),
            LikerID : parseInt(MyID,10)
        }
    })
    

    if(!exist){

        const like = await prisma.like.create({
        data : {
            LikerID : parseInt(MyID,10),
            PostID : parseInt(id,10)

        }
    })

    res.status(200).json({
        like
    })
        
    }
    else
        {

            const like = await prisma.like.delete({
            where : {
               id : exist.id

            }
        })

        res.status(200).json({
            like
        })

    }
    
};


exports.users = async (req,res)=> {
 
    const users = await prisma.user.findMany()
   
    res.status(200).json({
        users
    })
};

exports.user = async (req,res)=> {

    const {id} = req.params
 
    const user = await prisma.user.findUnique({
        where : {id:parseInt(id,10)}
    })
   
    res.status(200).json({
        user
    })
};

exports.posts = async (req,res)=> {

    const {id} = req.params
 
    const user = await prisma.user.findUnique({
        
        
        where : {
            id : parseInt(id,10)
        },
        include : {
            posts : {
                orderBy : 
                {
                    created_at : "desc"
                },
                include : {
                    likes : true,
                    Poster : true,
                    comments:{
                            include : {
                                Commenter:true
                            }
                        }
                }
            } ,
            
            friendsA : 
            {
                include : 
                {posts : {
                    orderBy : 
                    {
                        created_at : "desc"
                        
                    },
                    include : {
                        likes : true,
                        Poster : true,
                        comments:{
                            include : {
                                Commenter:true
                            }
                        }
                    }
                }
                }
            } , 
            friendsB : 
            {
                include : 
                {posts : {
                    orderBy : 
                    {
                        created_at : "desc"
                    },
                    include : {
                        likes : true,
                        Poster : true,
                        comments:{
                            include : {
                                Commenter:true
                            }
                        }
                    }
                }
                },
                
            }
            
        }
        ,
        
    
    })

    const AllFriends = [...user.friendsA || [],...user.friendsB || []]


    let AllPosts = [...(user.posts || [])]

for (let friend of AllFriends) {
  AllPosts = [...AllPosts, ...(friend.posts || [])]
}

// Deduplicate by ID
const postsMap = new Map()
for (let p of AllPosts) {
  postsMap.set(p.id, p)
}
AllPosts = Array.from(postsMap.values())

// Sort
AllPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

res.status(200).json({ AllPosts })
};


exports.comments = async (req,res)=> {

    const {id} = req.params
 
    const comments = await prisma.comment.findMany({
        
        
        where : {
            PostID : parseInt(id,10)
        },
        include : {
            Commenter : true
        }
        
        
    
    })
   
    res.status(200).json({
        comments 
    })
};
