import discord
from discord.ext import commands
import requests

intents = discord.Intents(messages = True, guilds = True, reactions = True, members = True, presences = True)
client = commands.Bot(command_prefix = "!", intents = intents)

# Message for Starting the Bot
@client.event
async def on_ready():
    print("PaulSMP ist startklar")

@client.command()
async def ping(ctx):
    await ctx.send("Pong!")

@client.command(description="Mutes the specified user.")
@commands.has_permissions(manage_messages=True)
async def mute(ctx, member: discord.Member, *, reason=None):
    guild = ctx.guild
    mutedRole = discord.utils.get(guild.roles, name="Gemuted")

    if not mutedRole:
        mutedRole = await guild.create_role(name="Gemuted")

        for channel in guild.channels:
            await channel.set_permissions(mutedRole, speak=False, send_messages=False, read_message_history=True, read_messages=True)
    embed = discord.Embed(title="muted", description=f"{member.mention} was muted ", colour=discord.Colour.dark_red())
    embed.add_field(name="reason:", value=reason, inline=False)
    await ctx.send(embed=embed)
    await member.add_roles(mutedRole, reason=reason)
    await member.send(f" you have been muted from: {guild.name} reason: {reason}")

@client.command()
async def info(ctx):
    await ctx.send('Der Bot wurde von byZero und Paul gemacht - https://byzero.xyz')

@client.command()
async def website(ctx):
    await ctx.send("Du findest meine Website unter: https://linktr.ee/Chaospaul__")

@client.command()
async def twitch(ctx):
    await ctx.send('https://www.twitch.tv/chaospaul__')

@client.command()
async def owner(ctx):
    await ctx.send('Der Offizielle Server Eigentümer ist <@703592068366467102>')

@client.command()
async def ts(ctx):
    await ctx.send('Du findest meinen TeamSpeak-Server unter: PSMP')

@client.command()
async def yt(ctx):
    await ctx.send('https://www.youtube.com/channel/UCentT7GsT0GKKtnKOP4Ew5g')

@client.command()
async def invite(ctx):
    await ctx.send('https://discord.com/oauth2/authorize?client_id=804316713025929228&permissions=8&scope=bot')

@client.command
@commands.has_permissions(ban_members=True)
async def ban(ctx, member : discord.Member, *, reason: str = None):
    await member.ban(reason=reason)
    print (f'Yea, so I just banned {member} if that\'s okay :)')
    embed=discord.Embed(title=f"Banning {member}")
    embed.set_image(url="https://cdn.tixte.com/uploads/byzero.steals-code.tk/koota42pn9a.gif")
    await ctx.send(embed=embed)

@client.command()
async def meme(ctx):
    # Request:
    response = requests.get('https://evergene.io/api/memes/')
    json_response = response.json()
    imageurl = json_response['url']

    # Message
    embed=discord.Embed(title="Here you go:")
    embed.set_image(url=imageurl)
    await ctx.send(embed=embed)

with open('tokens/token.txt','r') as file:
    TOKEN = file.read()
client.run(TOKEN)