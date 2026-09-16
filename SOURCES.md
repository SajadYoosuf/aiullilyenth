# Research and teaching scope

The map-address example uses Princess Street, Fort Kochi, from [Kerala Tourism](https://www.keralatourism.org/french/destination/princess-street-fort-kochi/176). Source coordinates 9.967498, 76.244316 are rounded to 9.9675° N, 76.2443° E. The lesson distinguishes a geographic point from illustrative word vectors.

The introduction includes bilingual NLP/LLM definitions and an interactive selection of historical milestones. This is a learning sequence, not an exhaustive history or a claim that older NLP methods disappeared.

- [Stanford NLP](https://nlp.stanford.edu/): the broader research field.
- [A Statistical Approach to Machine Translation (1990)](https://aclanthology.org/J90-2002/): statistical translation.
- [Bahdanau, Cho and Bengio (2014 preprint / 2015 ICLR)](https://arxiv.org/abs/1409.0473): neural translation with attention, before Transformers.
- [Attention Is All You Need, Vaswani et al. (2017)](https://arxiv.org/abs/1706.03762), [PDF](https://arxiv.org/pdf/1706.03762), [section 3.2](https://arxiv.org/html/1706.03762v7#S3.SS2): original Transformer and scaled dot-product attention.
- [Google Research explanation](https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/): architecture background.
- [BERT (2018)](https://arxiv.org/abs/1810.04805): bidirectional pretraining and adaptation.
- [GPT-3 (2020)](https://arxiv.org/abs/2005.14165): few-shot prompting.
- [InstructGPT (2022)](https://arxiv.org/abs/2203.02155): instruction following with human feedback.

## What runs here

The main 2D lesson deliberately uses softmax(dot product / 10) and handpicked coordinates. Its friendliness and excitement axes are teaching analogies, not measured model features.

The optional Attention panel implements one row of softmax(QKᵀ / sqrt(d_k))V. It uses distinct toy K and V vectors; for simplicity each selectable Q equals its corresponding K. A causal mask removes future positions before normalization, equivalent to assigning their logits negative infinity. Self-attention remains allowed. Displayed numbers are rounded; calculations use full precision.

This panel implements the paper's attention operation, not a trained Transformer. Learned projections, multiple heads, positional encodings, feed-forward layers, residual connections, normalization and training are outside its scope. The original paper describes an encoder-decoder translation model; modern language-model architectures vary. Gemini generates lesson material but does not expose its internal attention through this application.
